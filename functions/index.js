const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({
  origin: true,
});
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.submit = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "*");
  res.set("Accept", "application/json");

  if (req.method === "OPTIONS") {
    res.end();
  } else {
    cors(req, res, () => {
      if (req.method !== "POST") {
        return;
      }

      const email = req.body.email;
      const name = req.body.name;
      const message = req.body.message;

      const mailOptions = {
        from: email,
        replyTo: email,
        to: gmailEmail,
        subject: `Portfolio message from ${name}`,
        text: `${message}\nfrom ${email}`,
        html: `<p>${message}</p><br/><p>from ${email}</p>`,
      };

      return mailTransport.sendMail(mailOptions).then(() => {
        res.status(200).send({
          isEmailSend: true,
        });
        return;
      });
    });
  }
});
