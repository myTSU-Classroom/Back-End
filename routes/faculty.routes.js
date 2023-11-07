const express = require("express");
const router = express.Router();
const {
  getFaculty,
  getDirectionAndGroup,
} = require("../controller/faculty.controller");

const { getAllDiscipline } = require("../controller/discipline.controller");

// Get faculty
router.get("/faculty", getFaculty);

// Get faculty's direction
router.get("/faculty/:id", getDirectionAndGroup);

// Get all disciplines
router.get("/discipline", getAllDiscipline);

module.exports = router;
