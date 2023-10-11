import React from "react";
import FriendCard from "./FriendCard";
export default function Friends() {
  return (
    <div
      className="p-2"
      style={{ border: "1px solid #d5d5d5", backgroundColor: "lightgrey" }}
    >
      <div className="d-flex justify-content-between my-2 ">
        <input
          className="border-0 px-2"
          style={{ outline: "none" }}
          placeholder="Add Friend by email"
        />
        <button className="btn btn-primary btn-sm">Add Friend</button>
      </div>

      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
}
