import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";
export const create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    }).then((post) => {
      req.flash("success", "post created successfully");
      res.redirect("back");
    });
  } catch (err) {
    if (err) {
      req.flash("error", "error in creating a post");

      return;
    }
  }
};

export const destroy = (req, res) => {
  Post.findById(req.params.id).then((post) => {
    //.id means converting the object id into string
    if (post.user == req.user.id) {
      post.deleteOne().then((success) => {
        Comment.deleteMany({ post: req.params.id })
          .catch((err) => {
            req.flash("error", err);
            res.redirect("back");
          })
          .then((success) => {
            req.flash("success", "post destroye successfully");
            res.redirect("back");
          });
      });
    } else {
      req.flash("error", "you cannot delete successfully");
      return res.redirect("back");
    }
  });
};
