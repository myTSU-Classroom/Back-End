const passwordGenerator = require("generate-password");
const { Token } = require("../models/token.model");
const emailHelper = require("../helper/email.helper");
const crypto = require("crypto");
const { User } = require("../models/user.model");
const { Blacklist } = require("../models/blacklist.model");
const constant = require("../middleware/constants");
const mongoose = require("mongoose");
const { generateAccessToken, parseToken } = require("../helper/jwt.helper");

async function registerUser(req, res) {
  try {
    const isEmailRegistered = await User.findOne({ email: req.body.email });

    if (isEmailRegistered) {
      return res.status(400).json({
        error: true,
        message: "Email is already registered.",
      });
    }

    const avatarPath = `${constant.hostUrl}/uploads/avatar/${req.file.filename}`;

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

    return res.status(201).json({
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

async function loginUser(req, res) {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });
    if (!user || user.password !== req.body.password) {
      return res.status(403).json({
        error: true,
        message: "Password is incorrect",
      });
    }

    const token = generateAccessToken(user._id);

    return res.status(200).json({ token: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

async function getUser(req, res) {
  try {
    // Get user based on ID
    if (req.query.userId !== undefined) {
      if (!mongoose.Types.ObjectId.isValid(req.query.userId)) {
        return res.status(400).json({
          error: true,
          message: "Invalid ObjectId format",
        });
      }

      const user = await User.findById(req.query.userId).select(
        "-isAdmin -isEmailVerified -isAdminVerified -password -birthDate -avatar"
      );

      if (user.length === 0) {
        return res.status(404).json({
          error: true,
          message: "There is no user found.",
        });
      }

      return res.status(200).json(user);
    }

    // Get user based on teacher role
    if (req.query.role !== undefined) {
      const role = req.query.role.toLowerCase();

      const user = await User.find({
        role: { $regex: new RegExp(req.query.role, "i") },
      }).select(
        "-isAdmin -isEmailVerified -isAdminVerified -password -birthDate"
      );

      if (user.length === 0) {
        return res.status(404).json({
          error: true,
          message: "There is no user found.",
        });
      }

      return res.status(200).json(user);
    }

    const user = await User.find().select(
      "-isAdmin -isEmailVerified -isAdminVerified -password -birthDate -avatar"
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

async function editProfile(req, res) {
  try {
    const isUserExist = await User.findById(req.body.userId);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

async function logoutProfile(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        message: "Access token is missing.",
      });
    }

    const token = authHeader && authHeader.split(" ")[1];

    const tokenParsed = parseToken(req, res);

    const newBlacklistedToken = new Blacklist({
      token: token,
      userId: tokenParsed.sub,
    });

    newBlacklistedToken.save();

    return res.status(200).json({
      error: false,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
}

module.exports = {
  registerUser,
  getUser,
  loginUser,
  editProfile,
  logoutProfile,
};
