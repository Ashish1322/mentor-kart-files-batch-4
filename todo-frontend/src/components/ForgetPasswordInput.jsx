import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function ForgetPasswordInput() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const updatePassword = () => {
    if (password != password2) {
      alert("Password are not Matching");
      return;
    }
    // make an api call and send the tokne received from email and new password to backend
    fetch(`http://localhost:3001/handle-update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success == false) {
          alert(data.message);
        } else {
          // if todo is deleted successfully
          navigate("/");
        }
      })
      .catch((err) => console.log("Error ", err.message));
  };
  return (
    <div>
      <h3>Update Password</h3>
      <input
        onChange={(e) => setPassword(e.currentTarget.value)}
        type="password"
        placeholder="Enter New Password"
      />
      <br />
      <input
        onChange={(e) => setPassword2(e.currentTarget.value)}
        type="password"
        placeholder="Enter New Password"
      />
      <br />
      <button onClick={updatePassword}>Update Password</button>
    </div>
  );
}
