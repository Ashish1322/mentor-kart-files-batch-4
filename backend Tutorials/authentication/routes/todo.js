const express = require("express");

const router = express.Router();

// conrotllers
const {
  addTodo,
  delteTodo,
  markAsComplete,
  readTodo,
} = require("../controllors/todo");

// STEP 3:  ADD TODO ( Needs Token else will not allows)
router.post("/add", addTodo);

// READ TODO
router.get("/get", readTodo);

// TIP: Whenever you wanted to designa an api where docuemnt will be updated or delte always spicify the
//      _id or docId in the url params of api

// Update Todo ( userId, title, description, completed, todoId)
router.put("/mark-complete/:todoId", markAsComplete);

// Delete Todo
router.delete("/delete/:todoId", delteTodo);

module.exports = router;
