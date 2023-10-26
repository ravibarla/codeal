//render profile page 
export const profile = (req, res) => {
    res.render("user_profile", {
        title: "user profile"
    })
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