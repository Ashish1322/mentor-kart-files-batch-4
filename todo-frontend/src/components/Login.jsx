import { useContext } from "react";
import { useState } from "react";
import TodoContext from "../TodoContext";
import { Link } from "react-router-dom";
import Error from "./Error";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useContext(TodoContext);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="card" style={{ width: "25rem" }}>
        {error ? <Error message={error} /> : null}

        <img
          height="300px"
          src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Login</h5>

          <form onSubmit={hanldeSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                onChange={(e) => setEmail(e.currentTarget.value)}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.currentTarget.value)}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            {loading ? (
              <button type="submit" disabled className="btn btn-primary">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Please Wait...
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            )}
          </form>
        </div>

        <Link className="text-center mb-3" to="/signup">
          Alread Have An Account ?
        </Link>
      </div>
    </div>
  );
}
