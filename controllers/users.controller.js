import { User } from "../models/users.js";

//render profile page
export const profile = (req, res) => {
  if (req.isAuthenticated()) {
    // console.log("inside sign in");
    // return res.redirect("/users/profile");
    User.findById(req.params.id).then((user) => {
      return res.render("user_profile", {
        title: "user profile",
        profile_user: user,
      });
    });
  }
  //   return res.render("user_profile", {
  //     title: "user profile",
  //   });
};
export const update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body).then((user) => {
      req.flash("success", "updated");
      res.redirect("back");
    });
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
