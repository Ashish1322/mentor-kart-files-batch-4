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
      <div className="container mt-4 p-4 bg-info">
        <h1 className="text-center">Welcom {user && user.name}</h1>
        <div className="text-center">
          <button className="btn btn-sm btn-warning" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="row">
          <div className="col col-6">
            <div className="card" style={{ width: "25rem" }}>
              <div className="card-body">
                <h5 className="card-title">Add Todo</h5>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addTodo(title, description);
                  }}
                >
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.currentTarget.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      onChange={(e) => setDesc(e.currentTarget.value)}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Todo
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col col-6">
            <div className="container mt-5">
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
        </div>
      </div>
    </div>
  );
}
