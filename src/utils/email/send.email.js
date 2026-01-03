import path from "node:path";
import nodemailer from "nodemailer";

export const sendEmail = async ({to="", cc="", bcc="", subject="SarahApp", text="", html="", attachments=[]} = {}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `"Falcon" <${process.env.EMAIL}>`,
    // to: "fadyalamer284@gmail.com, fadyalamer333@gmail.com",
    // to: ["fadyalamer284@gmail.com", "fadyalamer333@gmail.com"],
    // cc: ["fadyalamer72@gmail.com"],
    // bcc: ["fadyalamer72@outlook.com"],
    // subject: "I hacked your account 👻",
    // text: "You are hacking now", // plain‑text body
    // html: "<b>You are hacking now</b>", // HTML body
    to,
    cc,
    bcc,
    text,
    html,
    subject,
    attachments,
  //   attachments:[
  //     {
  //       filename: 'data.txt',
  //       content: "Fady Alamir"
  //     },
  //     {
  //       filename: 'data255.txt',
  //       path: path.resolve("./notes.txt")
  //     },
  //     {
  //       filename: 'content.pdf',
  //       path: path.resolve("./content.pdf"),
  //       contentType: 'application/pdf'
  //     }
  //   ]
  })
  console.log("Message sent:", info.messageId);
  return info
}