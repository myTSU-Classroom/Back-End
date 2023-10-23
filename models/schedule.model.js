const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
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
        ref: "Group",
        required: true,
      },
    ],
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = { Schedule };
