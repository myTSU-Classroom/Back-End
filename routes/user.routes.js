const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const multer = require("multer");
const avatarConfig = require("../config/avatar.config");
const passwordGenerator = require("generate-password");

/* Register user */
const uploadAvatar = multer({ storage: avatarConfig });
router.post("/register", uploadAvatar.single("avatar"), async (req, res) => {
  try {
    const isEmailRegistered = await User.findOne({ email: req.body.email });

    if (isEmailRegistered) {
      return res.status(400).json({
        error: true,
        message: "Email is already registered.",
      });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const avatarPath = `${req.protocol}://${req.get("host")}/uploads/avatar/${
      req.file.filename
    }`;
    const isAdmin = req.body.isAdmin || false;

    var generatedPassword = passwordGenerator.generate({
      length: 16,
      numbers: true,
    });

    const user = new User({
      name: req.body.name,
      birth_date: req.body.birth_date,
      email: req.body.email,
      phone: req.body.phone,
      avatar: avatarPath,
      role: req.body.role,
      faculty: req.body.faculty,
      direction: req.body.direction,
      group: req.body.group,
      grade: req.body.grade,
      password: generatedPassword,
      isAdmin: isAdmin,
    });

    await user.save();

    return res.status(200).json({
      error: true,
      message: "User data has been saved.",
    });
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
});

router.get("/user", async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(400).json({
        error: true,
        message: err.message,
      });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;
