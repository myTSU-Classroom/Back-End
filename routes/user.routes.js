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
  acceptDefaultUser,
  editProfile,
} = require("../controller/user.controller");

const { validateAdminToken } = require("../helper/jwt.helper");

// Register user
router.post("/register", uploadAvatar.single("avatar"), registerUser);

// Get user
router.get("/user", getUser);

// Edit user
router.put("/profile", uploadAvatar.single("avatar"), editProfile);

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutProfile);

// Accept default user
router.post("/acceptuser", validateAdminToken, acceptDefaultUser);

module.exports = router;
