import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const forgetPassword = () => {
    fetch(`http://localhost:3001/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          alert(data.message);
        } else {
          // if todo is deleted successfully
          alert(data.message);
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };

  return (
    <div>
      <h3>Forget Your Password</h3>

      <p>Enter Email associated with your account ?</p>
      <input
        onChange={(e) => setEmail(e.currentTarget.value)}
        placeholder="Enter Your Email"
        type="email"
      />
      <button onClick={forgetPassword}>Forget Password</button>
      <br />
      <Link to="/">Back to Login </Link>
    </div>
  );
}
