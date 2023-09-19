const express = require("express");
const mongoose = require("mongoose");

const User = require("./modals/user");
const Todos = require("./modals/todo");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

// import middlewares
const { checkBodyParams, isLoggedIn } = require("./midllewares/genera.js");

app.use(express.json());

// Database Connecton
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Erro Conncting Database ", err.message));

// STEP 1:  Singup ( POST )
app.post("/auth/signup", checkBodyParams, (req, res) => {
  const { email, password, name } = req.body;

  // 1. If Account with this email already exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If Email exist return the response from here only
      if (user) {
        return res.json({ success: false, message: "Email Already in Use!" });
      }
      // if email is new then first we will has the password
      bcrypt.hash(password, 10, (err, has) => {
        if (err) {
          return res.json({ success: false, message: err.message });
        }

        // Create User in database
        User.create({ email: email, name: name, password: has })
          .then(() => res.json({ success: true, message: "Account Created" }))
          .catch((err) => res.json({ success: false, message: err.message }));
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// STEP 2: LOGIN ( POST )
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Check if Account Exists
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({ success: false, message: "Email Not Found!" });
      }

      // if user exsit then compare password
      bcrypt.compare(password, user.password, (err, result) => {
        if (result == true) {
          // if password is verified
          // We well sign a token
          const token = jwt.sign(
            { name: user.name, email: user.email, _id: user._id },
            "12345"
          );

          console.log(token);
          return res.json({
            success: true,
            message: "Logged IN",
            token: token,
          });
        } else {
          return res.json({ success: false, message: "Wrong Password" });
        }
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// STEP 3:  ADD TODO ( Needs Token else will not allows)
app.post("/todo/add", isLoggedIn, (req, res) => {
  // 1. I will verify the token ( Token will be present in req.headers)

  const { title, description } = req.body;

  Todos.create({ title, description, createdBy: req.tokenData._id })
    .then((t) => res.json({ success: true, message: "Todo Added" }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// READ TODO
app.get("/todo/get", isLoggedIn, (req, res) => {
  Todos.find({ createdBy: req.tokenData._id })
    .then((todo) => {
      console.log(todo);
      return res.json({ success: true, todos: todo });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// TIP: Whenever you wanted to designa an api where docuemnt will be updated or delte always spicify the
//      _id or docId in the url params of api

// Update Todo ( userId, title, description, completed, todoId)
app.put("/todo/update/:todoId", isLoggedIn, (req, res) => {
  const { title, description, completed } = req.body;
  const todoId = req.params.todoId;

  // give me todo with given id and created by loggedIn user
  Todos.findOneAndUpdate(
    { _id: todoId, createdBy: req.tokenData._id },
    { title, description, completed }
  )
    .then((doc) => {
      if (doc) {
        return res.json({ success: true, data: "Todo Updagted" });
      } else {
        return res.json({ success: false, data: "No Document Found" });
      }
    })
    .catch((err) => res.json({ success: false, data: err.message }));
});

// Delete Todo
app.delete("/todo/delete/:todoId", isLoggedIn, (req, res) => {
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
});

app.listen(3001, () => console.log("Server is Running at 3001"));

// Vinahs: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmluYWhzaCIsImVtYWlsIjoiYXZpbmFzaEBnbWFpbC5jb20iLCJfaWQiOiI2NTA5ZGMwYzA2MTFkMDJkMWJjYWJmNzMiLCJpYXQiOjE2OTUxNDUwODJ9.jU_DU61SgQOwU2bVp6IF-HOx-fYYtM9vvJTP051L2Nc
// Ashish: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNoaXNoIiwiZW1haWwiOiJhc2hpc2hAZ21haWwuY29tIiwiX2lkIjoiNjUwOWRiZWUwNjExZDAyZDFiY2FiZjcwIiwiaWF0IjoxNjk1MTQ1MTQ3fQ.F42iikUxWlE45oT6bdaVEN4peHdIPsMyDVQCbCWAFQU
