import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import TodoContext from "./TodoContext";
import Home from "./components/Home";
import { json, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

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
      .then((data) => console.log(data))
      .catch((err) => {
        console.log("Error", err.messsage);
      });
  };

  const signup = (email, password, name) => {
    alert(email + password + name);
  };

  return (
    <TodoContext.Provider value={{ login, signup, user }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
