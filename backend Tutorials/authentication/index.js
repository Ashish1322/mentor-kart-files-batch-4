const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

// import routes
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const { isLoggedIn } = require("./midllewares/genera");

// setting apps
app.use(express.json());
app.use(cors());

// configurig routes
app.use("/auth", authRouter);
app.use("/todo", isLoggedIn, todoRouter);

// Database Connecton
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Erro Conncting Database ", err.message));

app.listen(3001, () => console.log("Server is Running at 3001"));
