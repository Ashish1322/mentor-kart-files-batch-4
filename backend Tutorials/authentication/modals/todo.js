const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersTodo",
    required: true,
  },
});

module.exports = mongoose.model("todos12345", todoSchema);
