const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("./modals/user");
const Todos = require("./modals/todo");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
// import middlewares
const { checkBodyParams, isLoggedIn } = require("./midllewares/genera.js");

app.use(express.json());
app.use(cors());

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
          .then((user) => {
            // if account is created successfully then sent an account activation email

            // generate token
            const token = jwt.sign({ _id: user._id }, "12345", {
              expiresIn: 30 * 30,
            });

            // send this tokne on email
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "a.m2001nov@gmail.com",
                pass: "aptz zbky ebnx cxxg",
              },
            });

            var mailOptions = {
              from: "a.m2001nov@gmail.com",
              to: user.email,
              subject: "Activate Your Account Todo",
              html: `
              <p> Hey ${user.name}, Welcome in Todo App. Your Account has been created. In order to use your accouant you 
              have to veify your email by clicking on following link </p>
            
              <a style="padding:10px; background-color: dodgerblue" href="http://localhost:3001/auth/activate-account/${token}"> Activate Account </a>
              `,
            };

            // sending email
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return res.json({ success: false, message: "Error Occured" });
              } else {
                return res.json({
                  success: true,
                  message:
                    "An Account activation link has been sent on given email.",
                });
              }
            });
          })
          .catch((err) => res.json({ success: false, message: err.message }));
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

// Route that will hanlde the accoaunt activation link sent on email
app.get("/auth/activate-account/:token", (req, res) => {
  const token = req.params.token;

  // try to verify token
  try {
    const data = jwt.verify(token, "12345");

    // try to find the User now
    User.findByIdAndUpdate(data._id, { emailVerified: true })
      .then(() => res.redirect("http://127.0.0.1:5173/"))
      .catch(() =>
        res.json({
          success: false,
          messaeg: "Please Try Again! We are sorry for Inconvinece!",
        })
      );
  } catch (err) {
    return res.json({ success: false, message: "Link has Been Expired!" });
  }
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
      //Checking Only: if user exsit then we will check the email is verified or not
      if (user.emailVerified == false)
        return res.json({
          success: false,
          message: "Please Verify Your Account by the link sent on mail",
        });

      // if user exsit then compare password
      bcrypt.compare(password, user.password, (err, result) => {
        if (result == true) {
          // if password is verified
          // We well sign a token
          const token = jwt.sign(
            { name: user.name, email: user.email, _id: user._id },
            "12345",
            { expiresIn: 30 }
          );

          return res.json({
            success: true,
            message: "Logged IN",
            token: token,
            name: user.name,
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
app.put("/todo/mark-complete/:todoId", isLoggedIn, (req, res) => {
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

// Forget Password

app.post("/forget-password", (req, res) => {
  const { email } = req.body;

  // 1. Check if any account exist with this email
  User.findOne({ email })
    .then((user) => {
      if (!user)
        return res.json({
          success: false,
          message: "No Account find with this email!",
        });

      // generate token forget password tokne
      let token = jwt.sign({ _id: user._id }, "forgetPasswordToken1234", {
        expiresIn: 30 * 30,
      });

      // modify the token so that it will work on vite
      let newToken1 = token.replace(".", "--");
      let newToken2 = newToken1.replace(".", "--");

      // send this tokne on email
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "a.m2001nov@gmail.com",
          pass: "aptz zbky ebnx cxxg",
        },
      });

      var mailOptions = {
        from: "a.m2001nov@gmail.com",
        to: user.email,
        subject: "Forget Password",
        html: `
        <p> Hey ${user.name}, Click on the followign link to update your password </p>
      
        <a style="padding:10px; background-color: dodgerblue" href="http://127.0.0.1:5173/forget-password/set-password/${newToken2}"> Update Password </a>

        <p> If it's not done by you, Just ingone it </p>
        `,
      };

      // sending email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.json({ success: false, message: "Error Occured" });
        } else {
          return res.json({
            success: true,
            message: "An Forget Password Link sent to your email",
          });
        }
      });
    })
    .catch((err) => res.json({ success: false, message: err.message }));
});

app.post("/handle-update-password", (req, res) => {
  const { token, password } = req.body;

  console.log(token);
  console.log(password);
});
