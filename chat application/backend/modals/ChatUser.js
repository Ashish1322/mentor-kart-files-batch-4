const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  profilePic: {
    type: String,
    required: true,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: true,
    required: true,
  },
});

// apply the indexing
userSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("ChatUser", userSchema);
