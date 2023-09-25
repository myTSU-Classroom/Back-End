const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  group_code: {
    type: String,
    required: true,
  },
  direction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "direction-database",
    required: true,
  },
});

const Group = mongoose.model("group-database", groupSchema);
module.exports = { Group };
