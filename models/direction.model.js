const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_code: {
    type: String,
    required: false,
  },
});

const directionSchema = new mongoose.Schema({
  direction: {
    type: String,
    required: true,
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  group: [groupSchema],
});

const Direction = mongoose.model("Direction", directionSchema);
module.exports = { Direction };
