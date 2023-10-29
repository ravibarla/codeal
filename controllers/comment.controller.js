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
          return res.redirect("/");
        })
        .catch((err) => console.log("error in creating comment"));
    })
    .catch((err) => console.log(""));
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
        }).then((success) => res.redirect("back"));
      }
    })
    .catch((err) => console.log());
};
