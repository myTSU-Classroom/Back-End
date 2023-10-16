const express = require("express");
const router = express.Router();
const { validateAdminToken } = require("../helper/jwt.helper");
const multer = require("multer");
const upload = multer();

const {
  createFaculty,
  updateFaculty,
  deleteFaculty,
} = require("./admin/faculty.admin.route");

const {
  createDirection,
  updateDirection,
  deleteDirection,
} = require("./admin/direction.admin.route");

const {
  createGroup,
  updateGroup,
  deleteGroup,
} = require("./admin/group.admin.route");

/* Faculty */
// Create a faculty
router.post("/faculty", validateAdminToken, upload.none(), createFaculty);

// Update a faculty
router.put("/faculty", validateAdminToken, upload.none(), updateFaculty);

// Delete a faculty
router.delete("/faculty", validateAdminToken, upload.none(), deleteFaculty);

/* Direction */
// Create a direction
router.post("/direction", validateAdminToken, upload.none(), createDirection);

// Update a direction
router.put("/direction", validateAdminToken, upload.none(), updateDirection);

// Delete a direction
router.delete("/direction", validateAdminToken, upload.none(), deleteDirection);

/* Group */
// Create a group
router.post("/group", validateAdminToken, upload.none(), createGroup);

// Update a group
router.put("/group", validateAdminToken, upload.none(), updateGroup);

// Delete a group
router.delete("/group", validateAdminToken, upload.none(), deleteGroup);

module.exports = router;
