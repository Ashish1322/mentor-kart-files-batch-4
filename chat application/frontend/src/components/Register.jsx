import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ChatContext from "../../ChatContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signup } = useContext(ChatContext);

  return (
    <section className="vh-100 d-flex align-items-center">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                Join GupSup !
              </h3>

              {/* Email input */}
              <div className="form-outline mb-3">
                <input
                  onChange={(e) => setName(e.currentTarget.value)}
                  type="text"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter your Name"
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    onClick={() => signup(email, password, name)}
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Register
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
