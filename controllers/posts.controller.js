import { Comment } from "../models/comment.js";
import { Like } from "../models/like.js";
import { Post } from "../models/post.js";
export const create = async (req, res) => {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "post is created",
      });
    }
    req.flash("success", "post created successfully");
    return res.redirect("back");
  } catch (err) {
    if (err) {
      req.flash("error", err);

      return res.redirect("back");
    }
  }
};

export const destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });
      post.deleteOne();
      await Comment.deleteMany({ post: req.params.id });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            post_id: req.params.id,
          },
          message: "post deleted successfully ",
        });
      }
    } else {
      req.flash("error", "you cannot delete successfully");
      return res.redirect("back");
    }
    req.flash("success", "post destroye successfully");
    res.redirect("back");
  } catch (err) {
    console.log(err);
    return;
  }
  // Post.findById(req.params.id).then((post) => {
  //.id means converting the object id into string
  // if (post.user == req.user.id) {
  // change :: deleting the associated likes for the post and all its comments likes too
  // post.deleteOne().then((success) => {
  //   Comment.deleteMany({ post: req.params.id })
  //     .catch((err) => {
  //       req.flash("error", err);
  //       res.redirect("back");
  //     })
  //     .then((success) => {
  //       if (req.xhr) {
  //         return res.status(200).json({
  //           data: {
  //             post_id: req.params.id,
  //           },
  //           message: "post deleted successfully ",
  //         });
  //       }
  //       req.flash("success", "post destroye successfully");
  //       res.redirect("back");
  //     });
  // });
  // } else {
  //   req.flash("error", "you cannot delete successfully");
  //   return res.redirect("back");
  // }
  // });
};
