import { createTransport } from "nodemailer";
import ejs from "ejs";
import path from "path";
import { development } from "./env.js";

export const transporter = createTransport(development.smpt);

export const renderTemplate = (data, relativePath) => {
  let mailHTML;
  //   let tmp = path.join(path.resolve(), "views/mailers", relativePath);
  //   console.log("path of render :", tmp);
  ejs.renderFile(
    path.join(path.resolve(), "views/mailers", relativePath),
    data,
    (err, template) => {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }
      mailHTML = template;
    }
  );

  // .catch((err) => {
  //   if (err) {
  //     console.log("error in rendering template");
  //     return;
  //   }
  // })
  // .then((template) => {
  //   mailHTML = template;
  // });
  return mailHTML;
};

// (err, template) => {
//     if (err) {
//       console.log("error in rendering template");
//       return;
//     }
//     mailHTML = template;
//   }
