import { development } from "../config/env.js";
import { renderTemplate, transporter } from "../config/nodemailer.js";

export const newComment = (comment) => {
  let htmlString = renderTemplate(
    {
      comment: comment,
    },
    "/comments/newComments.ejs"
  );
  transporter
    .sendMail({
      from: development.transporter.from,
      to: development.transporter.to,
      subject: "new comment published",
      html: htmlString,
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
