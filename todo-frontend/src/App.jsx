import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import TodoContext from "./TodoContext";
import Home from "./components/Home";
import { useNavigate, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const natigate = useNavigate();
  const login = (email, password) => {
    // try to login
    fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if the login is success then only we will store in in state
        if (data.success == false) {
          alert(data.message);
        } else {
          // if login is succes then store the user and move the user to home page
          setUser(data);
          natigate("/home");
        }
      })
      .catch((err) => {
        console.log("Error", err.messsage);
      });
  };

  const signup = (email, password, name) => {
    fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          // if account created then redirect the user
          alert("Account Created, Now you can Login");
          natigate("/");
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  const addTodo = (title, description) => {
    fetch("http://localhost:3001/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error While Adding Todo" + data.success);
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  return (
    <TodoContext.Provider value={{ login, signup, user, addTodo }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
