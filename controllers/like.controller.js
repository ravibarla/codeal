import { Comment } from "../models/comment.js";
import { Like } from "../models/like.js";
import { Post } from "../models/post.js";

export const toggleLike = async (req, res) => {
  try {
    //likes/toggle/?id=adfgh&type=Post
    let likebale;
    let deleted = false;
    if (req.query.type == "Post") {
      likebale = await Post.findById(req.query.id).populate("likes");
    } else {
      likebale = await Comment.findById(req.query.id).populate("likes");
    }

    //check if the like already exist
    let existingLike = await Like.findOne({
      likebale: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    //if like already exist then delete it
    if (likebale) {
      likebale.likes.pull(existingLike._id);
      likebale.save();
      existingLike.remove();
      deleted = true;
    } else {
      //else make a new like
      let newLike = await Like.create({
        likebale: req.query.id,
        onModel: req.query.type,
        user: req.user._id,
      });
      likebale.likes.push(like._id);
      likebale.save();
    }
    return res.json(200, {
      message: "request is successfull",
      data: {
        deleted: deleted,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal server error",
    });
  }
};
