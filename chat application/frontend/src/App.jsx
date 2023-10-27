import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Pusher from "pusher-js";

import ChatContext from "../ChatContext";
import { useEffect, useState } from "react";
export default function App() {
  const [user, setUser] = useState(null);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [acceptedRequests, setAcceptedRequest] = useState([]);
  const [receiver, setReceiver] = useState(null);

  const [messages, setMessages] = useState([]);

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

  const handleAcceptReqeust = (docid) => {
    fetch(`${BASE_URL}/friends/accept-request/${docid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          // store all the users in state
          fetchPendingRequest();
          fetchAcceptedRequests();
          toast.success("Request Accepted");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchMessages = () => {
    fetch(
      `${BASE_URL}/messages/get-message/${receiver && receiver.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) toast.err(data.message);
        else setMessages(data.messeges);
      })
      .catch((err) => console.log(err.message));
  };

  const sendMessage = (message) => {
    if (message.length == 0) return;

    fetch(`${BASE_URL}/messages/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        message,
        reciever: receiver.receiverId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) toast.error(data.message);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleRejectReqeust = (docid) => {
    fetch(`${BASE_URL}/friends/reject-request/${docid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          // store all the users in state
          fetchPendingRequest();
          fetchAcceptedRequests();
          toast.success("Request Accepted");
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

  // Subscribe the pusher channel when website is laoded first time
  useEffect(() => {
    var pusher = new Pusher("ae74635f648e28a76f25", {
      cluster: "ap2",
    });
    // 1. subscribed the channel
    var channel = pusher.subscribe("new-messege-channel");
    // 2. Bind with a specific event inside this cahnnel
    channel.bind("messege-added", (data) => {
      // create a new array in which all the previouse elements of array + new data will be there
      setMessages((previousState) => [...previousState, data]);
    });

    // syntax to provide the cleanup function
    return () => {
      pusher.unsubscribe("new-messege-channel");
    };
  }, []);

  useEffect(() => {
    if (acceptedRequests.length > 0) {
      // conecctionId, name
      const connectionId = acceptedRequests[0].connectionId;
      const name =
        user._id == acceptedRequests[0].sender._id
          ? acceptedRequests[0].receiver.name
          : acceptedRequests[0].sender.name;
      const receiverId =
        acceptedRequests[0].sender._id == user._id
          ? acceptedRequests[0].receiver._id
          : acceptedRequests[0].sender._id;

      setReceiver({ connectionId, name, receiverId });
    }
  }, [acceptedRequests]);

  // fetch all the messages everytime when the receiver state is chagned
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [receiver, user]);

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
          handleAcceptReqeust,
          handleRejectReqeust,
          receiver,
          setReceiver,
          sendMessage,
          messages,
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
