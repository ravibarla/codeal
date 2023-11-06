import express from "express";
import { router } from "./routes/index.js";
import expressEjsLayouts from "express-ejs-layouts";
import { db } from "./config/mongoose.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { passportLocal } from "./config/passport-local-stratergy.js";
import MongoStore from "connect-mongo";
import "dotenv/config";
import sassMiddleware from "node-sass-middleware";
import flash from "connect-flash";
import { setFlash } from "./config/middleware.js";
import path from "path";
const app = express();
const port = 3200;
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(expressEjsLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));
//make the upload path available to the browser
const __dirname = path.resolve();
// app.use(express.static(__dirname));
// console.log("jasbc :", path.join(__dirname, "/uploads"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookies in the db
const a = process.env.mongoUrl;
console.log("db :", a);
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
    store: MongoStore.create(
      {
        // mongooseConnection: db,
        mongoUrl: "mongodb://127.0.0.1:27017/codeal_development",
        autoRemove: "disabled",
      },
      (err) => console.log(err || "connect-mongodb setup ok ")
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => passport.setAuthenticatorUser(req, res, next));
app.use(flash());
app.use(setFlash);
//use express router

app.use("/", router);

app.listen(port, (req, res) => {
  console.log("app is running successfully on port :", port);
});
