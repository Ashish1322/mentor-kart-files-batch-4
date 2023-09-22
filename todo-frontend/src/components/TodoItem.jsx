import { useContext } from "react";

import TodoContext from "../TodoContext";
export default function TodoItem({ title, description, completed, id }) {
  const { deleteTodos, markAsComplete } = useContext(TodoContext);

  return (
    <div style={{ border: "1px solid #d5d5d5" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {completed == true ? "Completed" : "Pending"}</p>
      <button
        onClick={() => {
          deleteTodos(id);
        }}
      >
        Delete
      </button>
      {completed == false ? (
        <button onClick={() => markAsComplete(id)}>Mark as Complete</button>
      ) : null}
    </div>
  );
}
