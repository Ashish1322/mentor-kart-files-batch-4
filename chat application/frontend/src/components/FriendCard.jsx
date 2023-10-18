import React from "react";

export default function FriendCard({ name }) {
  return (
    <div className="card p-2 my-2" style={{ width: "100%" }}>
      <div className="row">
        <div className="col col-12 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src="https://mentorkart.com/images/logo-full.png"
          />
          <p className="mx-2 mt-1">{name}</p>
        </div>
      </div>
    </div>
  );
}
