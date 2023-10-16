const nodemailer = require("nodemailer");
require("dotenv/config");

const emailTransporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = { emailTransporter };
