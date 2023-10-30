const express = require("express");
const router = express.Router();
const {
  getFaculty,
  getDirectionAndGroup,
} = require("../controller/faculty.controller");

// Get faculty
router.get("/", getFaculty);

// Get faculty's direction
router.get("/:id", getDirectionAndGroup);

module.exports = router;
