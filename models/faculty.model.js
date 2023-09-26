const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  faculty: {
    type: String,
    required: true,
  },
});

const Faculty = mongoose.model("faculty-database", facultySchema);
module.exports = { Faculty };
