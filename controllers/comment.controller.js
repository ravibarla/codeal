import { newComment } from "../mailers/comment.mailers.js";
import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";

export const create = (req, res) => {
  Post.findById(req.body.post)
    .then((post) => {
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      })
        .then((comment) => {
          post.comments.push(comment);
          post.save();
          req.flash("success", "comment published");
          // let populatedComment = comment
          //   .populate("user", "name email")
          //   .execPopulate();
          // newComment(populatedComment);
          newComment(comment);
          return res.redirect("/");
        })
        .catch((err) => req.flash("error", err));
    })
    .catch((err) => {
      req.flash("error", err);
      return;
    });
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
