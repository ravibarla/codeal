import { renderTemplate, transporter } from "../config/nodemailer.js";

export const newComment = (comment) => {
  console.log("inside new comment");
  transporter
    .sendMail({
      from: "dummysender@gmail.com",
      to: "dummyreceiver@gmail.com",
      subject: "new comment published",
      html: "<h1>your comment is now published </h1>",
    })
    .catch((err) => {
      console.log("error in sending mail ", err);
      return;
    })
    .then((info) => {
      console.log("mail delivered ", info);
      return;
    });

  //   (err, info) => {
  //     if (err) {
  //       console.log("error in sending mail ", err);
  //       return;
  //     }
  //     console.log("mail delivered ", info);
  //     return;
  //   }
};
