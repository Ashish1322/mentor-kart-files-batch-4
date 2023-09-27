const express = require("express");
const mongoose = require("mongoose");

const Todos = require("./modals/todo");

const app = express();
const cors = require("cors");
// import middlewares
const { checkBodyParams, isLoggedIn } = require("./midllewares/genera.js");

// import controllers
const {
  signup,
  login,
  activateAccount,
  sendForgetPasswordLink,
  hanldePasswordUpdateDetials,
} = require("./controllors/authentication");

const {
  addTodo,
  delteTodo,
  markAsComplete,
  readTodo,
} = require("./controllors/todo");
app.use(express.json());
app.use(cors());

// Database Connecton
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Erro Conncting Database ", err.message));

// *********************** AUTHENTICATION ***************************
// STEP 1:  Singup ( POST )
app.post("/auth/signup", checkBodyParams, signup);
app.get("/auth/activate-account/:token", activateAccount);

// STEP 2: LOGIN ( POST )
app.post("/auth/login", login);

// Forget Password

app.post("/forget-password", sendForgetPasswordLink);

app.post("/handle-update-password", hanldePasswordUpdateDetials);

// *********************** TODO ***************************
// STEP 3:  ADD TODO ( Needs Token else will not allows)
app.post("/todo/add", isLoggedIn, addTodo);

// READ TODO
app.get("/todo/get", isLoggedIn, readTodo);

// TIP: Whenever you wanted to designa an api where docuemnt will be updated or delte always spicify the
//      _id or docId in the url params of api

// Update Todo ( userId, title, description, completed, todoId)
app.put("/todo/mark-complete/:todoId", isLoggedIn, markAsComplete);

// Delete Todo
app.delete("/todo/delete/:todoId", isLoggedIn, delteTodo);

app.listen(3001, () => console.log("Server is Running at 3001"));

// Vinahs: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmluYWhzaCIsImVtYWlsIjoiYXZpbmFzaEBnbWFpbC5jb20iLCJfaWQiOiI2NTA5ZGMwYzA2MTFkMDJkMWJjYWJmNzMiLCJpYXQiOjE2OTUxNDUwODJ9.jU_DU61SgQOwU2bVp6IF-HOx-fYYtM9vvJTP051L2Nc
// Ashish: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNoaXNoIiwiZW1haWwiOiJhc2hpc2hAZ21haWwuY29tIiwiX2lkIjoiNjUwOWRiZWUwNjExZDAyZDFiY2FiZjcwIiwiaWF0IjoxNjk1MTQ1MTQ3fQ.F42iikUxWlE45oT6bdaVEN4peHdIPsMyDVQCbCWAFQU
