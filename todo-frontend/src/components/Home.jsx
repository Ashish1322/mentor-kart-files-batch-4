import { useEffect, useContext, useState } from "react";
import TodoContext from "../TodoContext";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
export default function Home() {
  const { user, addTodo, fetchAllTodos, todos, logout } =
    useContext(TodoContext);
  const navigate = useNavigate();

  // if the compopnent is loading first time
  useEffect(() => {
    // if user doen'st exitst then go back to login
    if (!user) {
      console.log(user);
      navigate("/");
    } else {
      // otherwise fetch all his todos
      fetchAllTodos();
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  return (
    <div>
      <h1>Welcom {user && user.name}</h1>
      <button onClick={logout}>Logout</button>
      <div style={{ padding: 10, margin: 10, border: "1px solid #d5d5d5" }}>
        <h3>Add Todo</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          placeholder="Title"
        />
        <br />
        <br />
        <textarea
          value={description}
          onChange={(e) => setDesc(e.currentTarget.value)}
        ></textarea>
        <br />
        <button
          onClick={() => {
            addTodo(title, description);
            setTitle("");
            setDesc("");
          }}
        >
          Add Todo
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {todos.map((item, index) => (
          <TodoItem
            id={item._id}
            title={item.title}
            description={item.description}
            completed={item.completed}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}