import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import TodoContext from "./TodoContext";
import Home from "./components/Home";
import { useNavigate, Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import ForgetPasswordInput from "./components/ForgetPasswordInput";
import BootstrapGrid from "./components/BootstrapGrid";
import NavBar from "./components/NavBar";
function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const natigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // STEP 1
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
          setError(data.message);
        } else {
          // if login is succes then store the user and move the user to home page
          setUser(data);
          // but we will sotre it in localStorage Also
          localStorage.setItem("userdata", JSON.stringify(data));
          natigate("/home");
        }
      })
      .catch((err) => {
        console.log("Error", err.messsage);
      });
  };

  // STEP 2
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

  // Used by HOme Component to add the todo on database
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
          alert("Error While Adding Todo" + data.message);
        } else {
          // if added successfully then we will fetch the updated todos
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  // It will be called after login to fetch all the intitial todos
  const fetchAllTodos = () => {
    // if user doent's exits then go back
    if (!user) return;

    fetch("http://localhost:3001/todo/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error while Fetching Todos " + data.message);
        } else {
          setTodos(data.todos);
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  // Used by TodoItem Component to delte the specific todo with todoId
  const deleteTodos = (todoId) => {
    // Ask for confiramation
    let userAction = confirm("Are you sure ? You want to delte this todo?");
    if (userAction == false) {
      return;
    }
    fetch(`http://localhost:3001/todo/delete/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error while Deleting Todo " + data.message);
        } else {
          // if todo is deleted successfully
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  // Used by TodoItem Component to  mark as complete the specific todo with todoId
  const markAsComplete = (todoId) => {
    fetch(`http://localhost:3001/todo/mark-complete/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert("Error while Deleting Todo " + data.message);
        } else {
          // if todo is deleted successfully
          fetchAllTodos();
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  // when u are coming to website first time or reloading it we will chekc if your details are in lcoat
  // storeage and if they are then we have to update them in user state
  useEffect(() => {
    if (localStorage.getItem("userdata")) {
      setUser(JSON.parse(localStorage.getItem("userdata")));
      natigate("/home");
    }
  }, []);

  const logout = () => {
    natigate("/");
    localStorage.removeItem("userdata");
    setUser(null);
  };

  return (
    <TodoContext.Provider
      value={{
        login,
        signup,
        user,
        addTodo,
        fetchAllTodos,
        todos,
        deleteTodos,
        markAsComplete,
        logout,
        error,
        loading,
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/forget-password/set-password/:token"
          element={<ForgetPasswordInput />}
        />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
