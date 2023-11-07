import { useContext, useRef, useState } from "react";
import ChatContext from "../../ChatContext";

export default function UserProfileCard() {
  const { logout, user } = useContext(ChatContext);
  const imageRef = useRef();

  const fileChange = (e) => {
    console.log(e.currentTarget.files);
  };

  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-8 d-flex">
          <input
            onChange={fileChange}
            ref={imageRef}
            style={{ display: "none" }}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />

          <img
            onClick={() => imageRef.current.click()}
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={user.profilePic}
          />
          <p className="mx-2 mt-1">{user && user.name}</p>
        </div>
        <div className="col col-4">
          <button onClick={logout} className="btn btn-sm btn-warning">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
