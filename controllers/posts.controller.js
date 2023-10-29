import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
export const create = (req, res) => {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => res.redirect("back"))
    .catch((err) => {
      if (err) {
        console.log("error in creating a post");
        return;
      }
    });
};

export const destroy = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.deleteOne().then((success) => {
        Comment.deleteMany({ post: req.params.id })
          .catch((err) => res.redirect("back"))
          .then((success) => res.redirect("back"));
      });
    } else {
      return res.redirect("back");
    }
  });
};
