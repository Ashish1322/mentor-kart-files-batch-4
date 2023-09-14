const express = require("express");
const mongoose = require("mongoose");
const User = require("./modals/user");
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

// Singup ( POST )
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

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.headers);
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
            "falfdfjlskdfdsl"
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

app.get("/todos", (req, res) => {
  // 1. I will verify the token ( Token will be present in req.headers)
  const token = req.headers.authorization;

  try {
    var data = jwt.verify(token, "falfdfjlskdfdsl");
    // user LoggeIn

    res.json({ success: true, data: "HI" });
  } catch (err) {
    // err
    res.json({ success: false, data: "Token is Wrong" });
  }
});

app.listen(3001, () => console.log("Server is Running at 3001"));

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNoaWhzaCIsImVtYWlsIjoiYS5tMjAwMm5vdkBnbWFpbC5jb20iLCJfaWQiOiI2NTAxZmZmYWFhOWE3Mzk2OTlmYWI2M2IiLCJpYXQiOjE2OTQ3MTAwMTd9.KdFpVai8RK6Lj-HRsq33iwmhOsxqK_WfE9EK9A0qB80
