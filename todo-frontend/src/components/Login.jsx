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
    <div className="container">
      <form onSubmit={hanldeSubmit}>
        <h1 className="text-center text-muted">Login Now</h1>
        <input
          className="my-2 p-2"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Enter Email"
          type="email"
        />
        <br></br>
        <input
          className="my-2 p-2"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter Password"
          type="password"
        />
        <br></br>
        <input type="submit" value="Login" />
        <br />
        <Link className="text-center" to="/forget-password">
          Forget Password ?
        </Link>
        <br />
        <Link className="btn btn-outline-primary btn-sm" to="/signup">
          Don't have account, Register ?
        </Link>
      </form>

      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>

      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
