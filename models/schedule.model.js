const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number_of_class: {
    type: Number,
    required: true,
  },
  class_time: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  group: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group-database",
      required: true,
    },
  ],
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject-database",
    required: true,
  },
});

const Schedule = mongoose.model("schedule-database", scheduleSchema);
module.exports = { Schedule };
