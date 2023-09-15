const express = require("express");
const mongoose = require("mongoose");

const User = require("./modals/user");
const Todos = require("./modals/todo");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

// Database Connecton
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Erro Conncting Database ", err.message));

// STEP 1:  Singup ( POST )
app.post("/auth/signup", (req, res) => {
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
app.post("/todo/add", (req, res) => {
  // 1. I will verify the token ( Token will be present in req.headers)
  const token = req.headers.authorization;
  const { title, description } = req.body;

  // First i will verify if  user is LoggedIn or not
  try {
    var data = jwt.verify(token, "12345");
    // user is looged then add todo
    Todos.create({ title, description, createdBy: data._id })
      .then((t) => res.json({ success: true, message: "Todo Added" }))
      .catch((err) => res.json({ success: false, message: err.message }));
  } catch (err) {
    // err
    res.json({ success: false, data: "Not Authenticated" });
  }
});

// READ TODO
app.get("/todo/get", (req, res) => {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, "12345");

    Todos.find({ createdBy: data._id })
      .then((todo) => res.json({ success: true, todos: todo }))
      .catch((err) => res.json({ success: false, message: err.message }));
  } catch (err) {
    res.json({ success: false, data: "Not Authenticated" });
  }
});

// In order to make any route protected you have to use this code snippeit
app.get("/abc", (req, res) => {
  const token = req.headers.authorization;

  try {
    const data = jwt.verify(token, "12345");
    // after you can write your logic
  } catch (err) {
    res.json({ success: false, data: "Not Authenticated" });
  }
});

app.listen(3001, () => console.log("Server is Running at 3001"));
