import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import ChatContext from "../../ChatContext";
import SearchResultCard from "./SearchResultCard";
export default function Modal() {
  const [query, setQuery] = useState("");
  const { searchFriends, searchResults, BASE_URL, user } =
    useContext(ChatContext);

  const sendRequest = (friendId) => {
    fetch(`${BASE_URL}/friends/add-friend/${friendId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success == false) {
          toast.error(data.message);
        } else {
          toast.success("Freind Request Sent");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      {/* Button trigger modal */}

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between my-2 ">
                <input
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  className="border-1 px-2"
                  style={{ outline: "none", width: "80%" }}
                  placeholder="Search by Name of Email"
                />
                <button
                  onClick={() => searchFriends(query)}
                  className="btn btn-primary btn-sm"
                >
                  Search
                </button>
              </div>

              <div className="my-2">
                {searchResults.map((item, index) => (
                  <SearchResultCard
                    key={index}
                    sendRequest={sendRequest}
                    name={item.name}
                    email={item.email}
                    friendId={item._id}
                    profilePic={item.profilePic}
                  />
                ))}
              </div>
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
