const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const { Token } = require("../models/token.model");
const path = require("path");

router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const verificationToken = await Token.findOne({ token: token });

    if (!verificationToken || verificationToken.expiredAt < Date.now()) {
      return res.status(400).render("email_confirmation", {
        message: "Invalid or expired verification token.",
        logo: `${req.protocol}://${req.get("host")}/wpf_books.svg`,
      });
    }

    const user = await User.findById(verificationToken.userId);

    if (!user) {
      return res.status(400).render("email_confirmation", {
        message: "User not found.",
        logo: `${req.protocol}://${req.get("host")}/wpf_books.svg`,
      });
    }

    // Mark the user as verified and remove the verification token
    user.isEmailVerified = true;
    await user.save();
    console.log(verificationToken.userId);
    await Token.findByIdAndDelete({ _id: verificationToken._id });

    return res.status(200).render("email_confirmation", {
      message: "Your email account has been verified.",
      logo: `${req.protocol}://${req.get("host")}/wpf_books.svg`,
    });
  } catch (err) {
    return res.status(400).send({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;
