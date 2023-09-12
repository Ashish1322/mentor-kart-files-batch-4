const { Todo } = require("./modals/Todo");

// setting up express
const express = require("express");
const app = express();

// connecting to Mongodb
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error Ocucred While Conneting ", err.message));

// middlewares
app.use(express.json());

// Todo Routes

// 1. Add Todo : POST
app.post("/api/todos/add-todo", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const userId = req.body.userId;

  Todo.create({ title: title, description: description, userId: userId })
    .then(() => res.json({ success: true, message: "Data Aadded" }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// 2. Give me all todos : GET
app.get("/api/todos/get-all-todos", (req, res) => {
  Todo.find()
    .then((todos) => res.json({ success: true, todos: todos }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// 3. Update Todo: PUT
app.put("/api/todos/update", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const todoId = req.body.todoId;

  Todo.findByIdAndUpdate(todoId, { title: title, description: description })
    .then(() => res.json({ success: true, message: "Updated" }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// 3. Delete Todo : DELETE
app.delete("/api/todos/delete", (req, res) => {
  const id = req.body.todoId;

  Todo.findByIdAndDelete(id)
    .then(() => res.json({ success: true, message: "Delted" }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

app.listen(3001, () => console.log("Server is Running at port 3001"));
