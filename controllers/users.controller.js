import { User } from "../models/users.js"

//render profile page 
export const profile = (req, res) => {

    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id).catch(err => { console.log("error in finding user in profile") }).then(user => {
            if (user) {
                res.render("user_profile", {
                    title: "user profile",
                    user: user
                })
            }
            else {
                return res.redirect("/users/signin")
            }
        })
    }
    else {
        return res.redirect("/users/signin")
    }


}
//render signin page
export const signIn = (req, res) => {
    res.render("user_sign_in", {
        title: "codeal |sign in"
    })
}
//render signup page
export const signUp = (req, res) => {
    res.render("user_sign_up", {
        title: "codeal |sign up"
    })
}

//get sign up data
export const create = (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("back")
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            User.create(req.body).catch(err => {
                console.log("error in creating user in sign up"); return
            }).then(success => res.redirect("/users/signin"))
        } else {
            return res.redirect("back")
        }
    }).catch(err => {
        console.log("error in finding user in sign up"); return
    })
}

//get sign in data and create session 
export const createSession = (req, res) => {
    //steps to auhtn=enticate

    //find user
    User.findOne({ email: req.body.email }).then(user => {

        //handle user found
        if (user) {

            //handle mismatch password
            if (user.password != req.body.password) {
                return res.redirect("back")
            }
            //handle session creation
            res.cookie("user_id", user._id)
            return res.redirect("/users/profile")
        } else {
            return res.redirect("back")
        }
    }).catch(err => { console.log("error finding user in sign in") })


    //handle user not found
}