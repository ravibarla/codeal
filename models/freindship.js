import mongoose from "mongoose";

const freindshipSchema = new mongoose.Schema(
  {
    //user who sent the request
    from_user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    //user who accepts the request]
    to_user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Freindship = mongoose.model("Freindship", freindshipSchema);
