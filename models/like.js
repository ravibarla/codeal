import mongoose from "mongoose";

const likeSchema = new mongoose(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    //this defines the object id of the like dobject
    likeable: {
      type: mongoose.Schema.ObjectId,
      require: true,
      refPath: "onModel",
    },
    //this field is used for defining the type of liked object since this is a dynamic reference
    onModel: {
      type: String,
      require: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamp: true,
  }
);

export const Like = mongoose.model("Like", likeSchema);
