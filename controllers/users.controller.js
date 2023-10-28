import { User } from "../models/users.js";

//render profile page
export const profile = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("inside sign in");
    // return res.redirect("/users/profile");

    return res.render("user_profile", {
      title: "user profile",
    });
  }
  //   return res.render("user_profile", {
  //     title: "user profile",
  //   });
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
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .catch((err) => {
            console.log("error in creating user in sign up");
            return;
          })
          .then((success) => res.redirect("/users/signin"));
      } else {
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
  return res.redirect("/");
};
