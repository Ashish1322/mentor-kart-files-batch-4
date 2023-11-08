import React from "react";

export default function SearchResultCard({
  name,
  email,
  sendRequest,
  friendId,
  profilePic,
}) {
  return (
    <div className="card p-2 my-2" style={{ width: "100%" }}>
      <div className="row">
        <div className="col col-8 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={profilePic}
          />
          <p className="mx-2 mt-1">{name}</p>
          <p className="mx-2 mt-1">{email}</p>
        </div>
        <div className="col col-4">
          <button
            onClick={() => sendRequest(friendId)}
            className="btn btn-primary btn-sm"
          >
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}
