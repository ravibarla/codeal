import { Post } from "../../../models/post.js";
import { Comment } from "../../../models/comment.js";
export const index = async (req, res) => {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of posts",
    posts: posts,
  });
};

export const destroy = async (req, res) => {
  await Post.findById(req.params.id).then((post) => {
    //.id means converting the object id into string
    // if (post.user == req.user.id) {
    post.deleteOne().then((success) => {
      Comment.deleteMany({ post: req.params.id })
        .catch((err) => {
          // req.flash("error", err);
          // res.redirect("back");
          return res.json(500, {
            message: "internal server error",
          });
        })
        .then((success) => {
          return res.json(200, {
            message: "post and associated  comments deleted successfully  ",
          });
        });
    });
    // } else {

    // }
  });
  return res.json(401, {
    message: "you cannot delete this post",
  });
};
