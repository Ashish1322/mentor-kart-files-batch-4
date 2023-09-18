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
  console.log(req.tokenData);
  const { title, description } = req.body;

  Todos.create({ title, description, createdBy: data._id })
    .then((t) => res.json({ success: true, message: "Todo Added" }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

// READ TODO
app.get("/todo/get", isLoggedIn, (req, res) => {
  console.log("Controllor", req.tokenData);
  Todos.find({ createdBy: req.tokenData._id })
    .then((todo) => res.json({ success: true, todos: todo }))
    .catch((err) => res.json({ success: false, message: err.message }));
});

app.listen(3001, () => console.log("Server is Running at 3001"));

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiIiwiZW1haWwiOiJhYmNAZ21haWxjLmNvbSIsIl9pZCI6IjY1MDg4Njg4NjU5ZDE5ZjJlZDgyZWMwOSIsImlhdCI6MTY5NTA1OTE0M30.T6qvIjRc3BGdFPm9l7e4dSQzfsbq4kVG6bGpBo5soyA
