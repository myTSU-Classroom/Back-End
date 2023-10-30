const mongoose = require("mongoose");

const descriptionSchema = new mongoose.Schema({
  plainContent: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
});

const readingLiteratureSchema = new mongoose.Schema({
  plainContent: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
});

const disciplineSchema = new mongoose.Schema(
  {
    discipline: {
      type: String,
      required: true,
    },
    description: descriptionSchema,

    year: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    reading_literature: readingLiteratureSchema,

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    method: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    building: {
      type: String,
      when: {
        method: "Offline",
      },
    },
    room: {
      type: String,
      when: {
        method: "Offline",
      },
    },
  },
  {
    versionKey: false,
  }
);

const Discipline = mongoose.model("Discipline", disciplineSchema);
module.exports = { Discipline };
