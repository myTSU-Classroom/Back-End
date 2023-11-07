const mongoose = require("mongoose");

const disciplineSchema = new mongoose.Schema(
  {
    discipline: {
      type: String,
      required: true,
    },
    description_plainContent: {
      type: String,
      required: true,
    },
    description_htmlContent: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    readingAndLiterature_plainContent: {
      type: String,
      required: true,
    },
    readingAndLiterature_htmlContent: {
      type: String,
      required: true,
    },

    groupId: {
      type: mongoose.Schema.ObjectId,
      ref: "Direction.group",
      required: true,
    },

    teacherId: {
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
    dayOfWeek: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    finishTime: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Discipline = mongoose.model("Discipline", disciplineSchema);
module.exports = { Discipline };
