import { User } from "../models/users.js";
import path from "path";
import fs from "fs";
import { development } from "../config/env.js";

//render profile page
export const profile = (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.params.id).then((user) => {
      return res.render("user_profile", {
        title: "user profile",
        profile_user: user,
      });
    });
  }
};
export const update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("***multer Error :", err);
        }
        console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;
        // console.log("avatar path :",User.avatarPath)
        // console.log("req.file.filename :",req.file.filename)
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(path.resolve(), user.avatar));
          }
          user.avatar = path.join(User.avatarPath, req.file.filename);
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "unauthorized");
    return res.status(401).send("Unauthorized");
  }
};
//render signin page
export const signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "codeal |sign in",
  });
};
//render signup page
export const signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "codeal |sign up",
  });
};

//get sign up data
export const create = (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "password do not match");
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .catch((err) => {
            req.flash("error", err);
            return;
          })
          .then((success) => res.redirect("/users/signin"));
      } else {
        req.flash("success", "you have signed up , login to continue");
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("error in finding user in sign up");
      return;
    });
};

//get sign in data and create session
export const createSession = (req, res) => {
  req.flash("success", "logged in successfully");
  return res.redirect("/");
};

export const destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    req.flash("success", "you have logged out");
    return res.redirect("/");
  });
};
