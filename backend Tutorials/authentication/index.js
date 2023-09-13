const express = require("express");
const mongoose = require("mongoose");
const User = require("./modals/user");
const bcrypt = require("bcrypt");
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

app.listen(3001, () => console.log("Server is Running at 3001"));
