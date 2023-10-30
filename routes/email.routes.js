const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controller/email.controller");

// Verify Email
router.get("/verify/:token", verifyEmail);

module.exports = router;
