const passwordGenerator = require("generate-password");
const { Token } = require("../models/token.model");
const emailHelper = require("../helper/email.helper");
const crypto = require("crypto");
const { User } = require("../models/user.model");

async function registerUser(req, res) {
  try {
    const isEmailRegistered = await User.findOne({ email: req.body.email });

    if (isEmailRegistered) {
      return res.status(400).json({
        error: true,
        message: "Email is already registered.",
      });
    }

    const avatarPath = `${process.env.HOST_URL}/uploads/avatar/${req.file.filename}`;

    var generatedPassword = passwordGenerator.generate({
      length: 16,
      numbers: true,
    });

    const user = new User({
      name: req.body.name,
      birthDate: req.body.birthDate,
      email: req.body.email,
      phone: req.body.phone,
      avatar: avatarPath,
      role: req.body.role,
      faculty: req.body.faculty,
      direction: req.body.direction,
      group: req.body.group,
      grade: req.body.grade,
      password: generatedPassword,
      isAdmin: req.body.isAdmin || false,
      isAdminVerified: req.body.isAdminVerified || false,
    });

    await user.save();

    const token = new Token({
      userId: user._id,
      token: crypto.randomBytes(20).toString("hex"), // random hex string for token
    });

    await token.save();

    console.log("Sending email...");
    emailHelper.sendVerificationEmail(req, token.token);

    return res.status(200).json({
      error: false,
      message: "User data has been saved.",
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.find().select(
      "-password -isAdmin -isAdminVerified -avatar -phone -birthDate"
    );

    if (!user) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      message: "An error occurred while processing your request.",
    });
  }
}

module.exports = {
  registerUser,
  getUser,
};
