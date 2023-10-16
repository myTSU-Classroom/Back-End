const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_code: {
    type: String,
    required: false,
  },
});

const directionSchema = new mongoose.Schema(
  {
    direction: {
      type: String,
      required: true,
    },
    faculty_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },
    group: [groupSchema],
  },
  {
    versionKey: false,
  }
);

const Direction = mongoose.model("Direction2", directionSchema);
module.exports = { Direction };
