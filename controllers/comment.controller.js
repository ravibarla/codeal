import { queue } from "../config/kue.js";
import { newComment } from "../mailers/comment.mailers.js";
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";

export const create = async (req, res) => {
  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();

      comment = await comment.populate("user", "name email");
      // newComment(comment);
      let job = queue.create("emails", comment).save((err) => {
        if (err) {
          console.log("error in creating a queue :");
          return;
        }
        console.log("job is enqeued :", job.id);
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          message: "Post created!",
        });
      }

      req.flash("success", "Comment published!");

      res.redirect("/");
    }
  } catch (err) {
    console.log("err :", err);
    return;
  }
};

export const destroy = (req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      if (comment.user == req.user.id) {
        let postId = comment.post;
        comment.deleteOne();
        Post.findByIdAndUpdate(postId, {
          $pull: {
            comments: req.params.id,
          },
        }).then((success) => {
          // change :: destroy the assiciated likes for the comment
          Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
          req.flash("success", "comment deleted");
          res.redirect("back");
        });
      }
    })
    .catch((err) => {
      req.flash("error", err);
      return;
    });
};
