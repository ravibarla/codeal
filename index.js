import express from "express"
import { router } from "./routes/index.js"
import expressEjsLayouts from "express-ejs-layouts"

const app = express()
const port = 3200
app.use(expressEjsLayouts)
app.use(express.static("./assets"))
app.set("view engine", "ejs")
app.set("views", "./views")
app.use("/", router)
app.get("/", (req, res) => {
    return res.send("hello world")
})

app.listen(port, (req, res) => {
    console.log("app is running successfully on port :", port)
})