import React, { useState, useContext } from "react";
import FriendCard from "./FriendCard";
import ChatContext from "../../ChatContext";
export default function Friends() {
  const [query, setQuery] = useState("");
  const { searchFriends } = useContext(ChatContext);

  return (
    <div
      className="p-2"
      style={{ border: "1px solid #d5d5d5", backgroundColor: "lightgrey" }}
    >
      <div className="d-flex justify-content-between my-2 ">
        <input
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="border-0 px-2"
          style={{ outline: "none" }}
          placeholder="Search by Name of Email"
        />
        <button
          onClick={() => searchFriends(query)}
          className="btn btn-primary btn-sm"
        >
          Add Friend
        </button>
      </div>

      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
}
