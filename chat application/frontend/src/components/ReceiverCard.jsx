import React from "react";

export default function ReceiverCard() {
  return (
    <div
      className="card p-2"
      style={{ backgroundColor: "#FAF9F6", borderRadius: 0 }}
    >
      <div className="row">
        <div className="col col-8 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src="https://mentorkart.com/images/logo-full.png"
          />
          <p className="mx-2 mt-1">Mentor Kart</p>
        </div>
      </div>
    </div>
  );
}
