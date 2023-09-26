const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema({
  discipline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  reading_literature: {
    type: [String],
    required: false,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
});

const DisciplineSchema = mongoose.model(
  "discipline-database",
  disciplineSchema
);
module.exports = { Discipline };
