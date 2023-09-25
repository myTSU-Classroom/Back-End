const mongoose = require("mongoose");
const imageRegex = /\.(jpg|jpeg|png)$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return imageRegex.test(value);
      },
      message: "Avatar must be a valid image URL (jpg, jpeg, png).",
    },
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    required: true,
  },
  faculty: {
    type: String,
    when: {
      role: "Student",
    },
  },
  direction: {
    type: String,
    when: {
      role: "Student",
    },
  },
  group: {
    type: String,
    when: {
      role: "Student",
    },
  },
  grade: {
    type: String,
    when: {
      role: "Student",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user-database", userSchema);
module.exports = { User };
