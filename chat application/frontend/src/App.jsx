import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ChatContext from "../ChatContext";
import { useEffect, useState } from "react";
export default function App() {
  const [user, setUser] = useState(null);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [acceptedRequests, setAcceptedRequest] = useState([]);

  const navigator = useNavigate();
  const BASE_URL = "http://127.0.0.1:8000";

  const login = (email, password) => {
    fetch(`${BASE_URL}/auth/login`, {
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
          // store the user in state
          setUser(data);
          // store the user in localstorage
          localStorage.setItem("chatuser", JSON.stringify(data));
          // redirect to home page
          navigator("/home");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const signup = (email, password, name) => {
    fetch(`${BASE_URL}/auth/signup`, {
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

  const logout = () => {
    setUser(null);
    localStorage.clear("chatuser");
    navigator("/");
  };

  // check if user is loggedin already then redirect them to home page
  useEffect(() => {
    if (localStorage.getItem("chatuser")) {
      setUser(JSON.parse(localStorage.getItem("chatuser")));
      navigator("/home");
    }
  }, []);

  const [searchResults, setSearchResults] = useState([]);
  // search for friend

  const fetchPendingRequest = () => {
    fetch(`${BASE_URL}/friends/all-pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setPendingRequest(data.friends);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAcceptedRequests = () => {
    fetch(`${BASE_URL}/friends/all-friends`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == true) {
          setAcceptedRequest(data.friends);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const searchFriends = (query) => {
    fetch(`${BASE_URL}/friends/search-friend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          // store all the users in state
          setSearchResults(data.users);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  // if user is coming in website first time then fetch all the pending and accepted request
  useEffect(() => {
    if (user) {
      fetchPendingRequest();
      fetchAcceptedRequests();
    }
  }, [user]);

  console.log(pendingRequest);
  console.log(acceptedRequests);

  return (
    <div>
      <ChatContext.Provider
        value={{
          login,
          signup,
          logout,
          user,
          searchFriends,
          searchResults,
          fetchPendingRequest,
          BASE_URL,
          fetchAcceptedRequests,
          pendingRequest,
          acceptedRequests,
        }}
      >
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
