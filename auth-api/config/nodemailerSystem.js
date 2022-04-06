require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.MAIL_USER;
const password = process.env.MAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: password,
  },
});

module.exports.sendMsg = (email,subject, htmlbody) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: subject,
    html: htmlbody
  }).catch(err => console.log(err));
};

