import express from "express";
import { router } from "./routes/index.js";
import expressEjsLayouts from "express-ejs-layouts";
import { db } from "./config/mongoose.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { passportLocal } from "./config/passport-local-stratergy.js";
const app = express();
const port = 3200;
app.use(expressEjsLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeal",
    //todo change the secret before deployment in production mode
    secret: "ravi",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => passport.setAuthenticatorUser(req, res, next));

//use express router

app.use("/", router);

app.listen(port, (req, res) => {
  console.log("app is running successfully on port :", port);
});
