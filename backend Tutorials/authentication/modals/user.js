const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  password: String,
});

module.exports = mongoose.model("usersTodo", userShema);
