const express = require("express");
const router = express.Router();
const { Faculty } = require("../models/faculty.model");
const { Direction } = require("../models/direction.model");

// Get faculty
router.get("/", async (req, res) => {
  try {
    const faculty = await Faculty.find();

    if (faculty.length === 0) {
      return res.status(404).json({
        error: true,
        message: "There is no faculty found.",
      });
    }
    return res.status(200).json(faculty);
  } catch (err) {
    return res.status(400).json({
      error: true,
      message: err.message,
    });
  }
});

// Get faculty's direction
router.get("/:id", async (req, res) => {
  const facultyId = req.params.id;
  const directions = await Direction.find({ faculty_id: facultyId });

  if (!directions || directions.length === 0) {
    return res.status(404).json({
      error: true,
      message: "Directions not found",
    });
  }

  res.json(directions);
});

module.exports = router;