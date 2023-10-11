import React from "react";
import Messages from "./Messages";
import ReceiverCard from "./ReceiverCard";
import SendBox from "./SendBox";

export default function RightSideBar() {
  return (
    <div
      className="col col-9"
      style={{ border: "1px solid #d5d5d5", padding: 0, position: "relative" }}
    >
      <ReceiverCard />
      <Messages />
      <SendBox />
    </div>
  );
}
