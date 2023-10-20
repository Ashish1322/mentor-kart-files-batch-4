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
        <div className="col col-8 d-flex">
          <p className="mx-2 mt-1">{receiver && receiver.name}</p>
        </div>
      </div>
    </div>
  );
}
