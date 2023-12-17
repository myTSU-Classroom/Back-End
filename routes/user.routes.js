const express = require("express");
const router = express.Router();
const multer = require("multer");
const avatarConfig = require("../configs/avatar.config");
const uploadAvatar = multer({ storage: avatarConfig });
const {
  registerUser,
  getUser,
  loginUser,
  logoutProfile,
} = require("../controller/user.controller");

const { validateToken } = require("../helper/jwt.helper");

// Register user
router.post("/register", uploadAvatar.single("avatar"), registerUser);

// Get user
router.get("/user", getUser);

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutProfile);

module.exports = router;
