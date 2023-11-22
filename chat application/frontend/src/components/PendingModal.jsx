import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import ChatContext from "../../ChatContext";
import PendingCard from "./PendingCard";

export default function PendingModal() {
  const { pendingRequest } = useContext(ChatContext);

  return (
    <>
      {/* Button trigger modal */}

      {/* Modal */}
      <div
        className="modal fade"
        id="pendingdiv"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pending Requests
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body p-2">
              {pendingRequest.length == 0 ? <p>No Pending Requests</p> : null}
              {pendingRequest.map((item, index) => (
                <PendingCard
                  key={index}
                  email={item.sender?.email}
                  name={item.sender?.name}
                  docId={item?._id}
                />
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
