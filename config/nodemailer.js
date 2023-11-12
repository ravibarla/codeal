import { createTransport } from "nodemailer";
import ejs from "ejs";
import Path from "path";

export const transport = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: "dummy@gmail.com",
    pass: "dummy_password",
  },
});

export const renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    Path.resolve(),
    "/views/mailers",
    relativePath,
    data,
    (err, template) => {
      if (err) {
        console.log("error in rendering template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};
