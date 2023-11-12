import { createTransport } from "nodemailer";
import ejs from "ejs";
import path from "path";

export const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: "ad665014@gmail.com",
    pass: "bohk wyya mstu ppsz",
  },
});

export const renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs
    .renderFile(path.resolve(), "/views/mailers", relativePath, data)
    .catch((err) => {
      if (err) {
        console.log("error in rendering template");
        return;
      }
    })
    .then((template) => {
      mailHTML = template;
    });
  return mailHTML;
};

// (err, template) => {
//     if (err) {
//       console.log("error in rendering template");
//       return;
//     }
//     mailHTML = template;
//   }
