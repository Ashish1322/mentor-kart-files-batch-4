import React, { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function ReceiverCard() {
  const { receiver } = useContext(ChatContext);

  return (
    <div
      className="card p-2"
      style={{ backgroundColor: "#FAF9F6", borderRadius: 0 }}
    >
      <div className="row">
        <div className="col col-2 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={receiver && receiver.profilePic}
          />
        </div>
        <div className="col col-10 d-flex">
          <p className="mx-2 mt-1">{receiver && receiver.name}</p>
        </div>
      </div>
    </div>
  );
}
