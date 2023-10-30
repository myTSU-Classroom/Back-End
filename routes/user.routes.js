const express = require("express");
const router = express.Router();
const multer = require("multer");
const avatarConfig = require("../configs/avatar.config");
const uploadAvatar = multer({ storage: avatarConfig });
const { registerUser, getUser } = require("../controller/user.controller");

// Register user
router.post("/register", uploadAvatar.single("avatar"), registerUser);

// Get user
router.get("/user", getUser);

module.exports = router;
