const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { Token } = require("../models/token.model");
require("dotenv/config");

router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const verificationToken = await Token.findOne({ token: token });

    if (!verificationToken || Date.now() > verificationToken.expiredAt) {
      return res.status(400).render("email_confirmation", {
        message: "Invalid or expired verification token.",
        logo: `${process.env.HOST_URL}/wpf_books.svg`,
      });
    }

    const user = await User.findById(verificationToken.userId);

    if (!user) {
      return res.status(400).render("email_confirmation", {
        message: "User not found.",
        logo: `${process.env.HOST_URL}/wpf_books.svg`,
      });
    }

    // Mark the user as verified and remove the verification token
    user.isEmailVerified = true;
    await user.save();
    console.log(verificationToken.userId);
    await Token.findByIdAndDelete({ _id: verificationToken._id });

    return res.status(200).render("email_confirmation", {
      message: "Your email account has been verified.",
      logo: `${process.env.HOST_URL}/wpf_books.svg`,
    });
  } catch (err) {
    return res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;
