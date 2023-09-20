import { useContext } from "react";
import { useState } from "react";
import TodoContext from "../TodoContext";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(TodoContext);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <h1>Login Now</h1>
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
        <input type="submit" value="Login" />
        <br />
        <Link to="/signup">Don't have account, Register ?</Link>
      </form>
    </div>
  );
}
