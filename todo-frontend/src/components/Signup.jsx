import { useState, useContext } from "react";
import TodoContext from "../TodoContext";
import { Link } from "react-router-dom";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signup } = useContext(TodoContext);
  return (
    <div>
      <h1>Signup Now</h1>
      <input
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Enter Email"
        type="email"
      />
      <br></br>
      <input
        onChange={(e) => setPassword(e.currentTarget.value)}
        placeholder="Enter Password"
        type="password"
      />
      <br></br>
      <input
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Enter Name"
        type="text"
      />
      <br></br>
      <button
        onClick={() => {
          signup(email, password, name);
        }}
      >
        {" "}
        Signup{" "}
      </button>
      <br />

      <Link to="/">Already have account, Login ?</Link>
    </div>
  );
}
