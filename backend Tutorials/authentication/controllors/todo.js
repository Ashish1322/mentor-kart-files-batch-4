const Todos = require("../modals/todo");
const addTodo = (req, res) => {
  // 1. I will verify the token ( Token will be present in req.headers)

  const { title, description } = req.body;

  Todos.create({ title, description, createdBy: req.tokenData._id })
    .then((t) => res.json({ success: true, message: "Todo Added" }))
    .catch((err) => res.json({ success: false, message: err.message }));
};

const readTodo = (req, res) => {
  Todos.find({ createdBy: req.tokenData._id })
    .then((todo) => {
      console.log(todo);
      return res.json({ success: true, todos: todo });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
};

const markAsComplete = (req, res) => {
  const { completed } = req.body;
  const todoId = req.params.todoId;

  // give me todo with given id and created by loggedIn user
  Todos.findOneAndUpdate(
    { _id: todoId, createdBy: req.tokenData._id },
    { completed }
  )
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, data: "Todo Updagted" });
      } else {
        return res.json({ success: false, data: "No Document Found" });
      }
    })
    .catch((err) => res.json({ success: false, data: err.message }));
};

const delteTodo = (req, res) => {
  Todos.findOneAndDelete({
    _id: req.params.todoId,
    createdBy: req.tokenData._id,
  })
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, data: "Document Deleted" });
      } else {
        return res.json({ success: false, data: "No document Found" });
      }
    })
    .catch((err) => res.json({ success: false, data: err.message }));
};

module.exports = { addTodo, delteTodo, markAsComplete, readTodo };
