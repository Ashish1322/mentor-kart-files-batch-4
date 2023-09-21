import React from "react";

export default function TodoItem({ title, description, completed }) {
  return (
    <div style={{ border: "1px solid #d5d5d5" }}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Status: {completed == true ? "Completed" : "Pending"}</p>
      <button>Delete</button>
      <button>Mark as Complete</button>
    </div>
  );
}
