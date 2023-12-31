const mongoose = require("mongoose");

// [5,6,7]
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User1234",
  },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Todo = mongoose.model("Todos1234", todoSchema);

module.exports = { Todo };
