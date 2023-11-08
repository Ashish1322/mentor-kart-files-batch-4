import FriendCard from "./FriendCard";
import ChatContext from "../../ChatContext";
import { useContext } from "react";

import Modal from "./Modal";
import PendingModal from "./PendingModal";
export default function Friends() {
  const { pendingRequest, acceptedRequests, user } = useContext(ChatContext);

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
        data-bs-target="#pendingdiv"
      >
        Pending ( {pendingRequest.length} )
      </button>

      <Modal />
      <PendingModal />

      {acceptedRequests.map((item, index) => (
        <FriendCard
          key={index}
          name={
            item.sender._id == user._id ? item.receiver.name : item.sender.name
          }
          receiverId={
            item.sender._id == user._id ? item.receiver._id : item.sender._id
          }
          profilePic={
            item.sender._id == user._id
              ? item.receiver.profilePic
              : item.sender.profilePic
          }
          connectionId={item.connectionId}
        />
      ))}
    </div>
  );
}
