const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  literatures: {
    type: [String],
    required: false,
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user-database",
    },
  ],
});

const Subject = mongoose.model("subject-database", subjectSchema);
module.exports = { Subject };
