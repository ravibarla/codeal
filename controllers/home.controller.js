export const home = (req, res) => {
    console.log(req.cookies)
    return res.render("home", {
        title: "home"
    })
}