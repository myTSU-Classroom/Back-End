const mongoose = require("mongoose");
require("dotenv/config");

const groupSchema = mongoose.Schema({
  number: String,
});

const facultySchema = mongoose.Schema({
  faculty: String,
  group: [groupSchema],
});

const Faculty = mongoose.model(
  process.env.UNIVERSITY_COLLECTION,
  facultySchema
);

// module.exports = { Faculty }
