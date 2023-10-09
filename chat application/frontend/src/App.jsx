import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ChatContext from "../ChatContext";
import { useState } from "react";
export default function App() {
  const [user, setUser] = useState(null);

  const navigator = useNavigate();

  const login = (email, password) => {
    fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          setUser(data);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signup = (email, password, name) => {
    fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          navigator("/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const logout = () => {};

  return (
    <div>
      <ChatContext.Provider value={{ login, signup, logout, user }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ChatContext.Provider>
    </div>
  );
}
