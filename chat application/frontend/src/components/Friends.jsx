import FriendCard from "./FriendCard";
import ChatContext from "../../ChatContext";
import { useContext } from "react";

import Modal from "./Modal";
export default function Friends() {
  const { pendingRequest } = useContext(ChatContext);

  return (
    <div
      className="p-2"
      style={{ border: "1px solid #d5d5d5", backgroundColor: "lightgrey" }}
    >
      <button
        type="button "
        className="btn btn-primary btn-sm "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Search a Freind
      </button>
      <button
        type="button "
        className="btn btn-warning btn-sm mx-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Pending ( {pendingRequest.length} )
      </button>

      <Modal />

      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </div>
  );
}
