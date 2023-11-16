import { json } from "express";
import { User } from "../../../models/users.js";
import jwt from "jsonwebtoken";
import { development } from "../../../config/env.js";

export const createSession = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user.password != req.body.password) {
      return res.json(422, {
        message: "invalid username or password",
      });
    }
    return res.json(200, {
      message:
        "signed in successfully, here is your token ,please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), development.jwtSecretKey, {
          expiresIn: "100000",
        }),
      },
    });
  } catch (err) {
    console.log("***", err);
    return res.json(500, {
      message: "internal server error  ",
    });
  }
};
