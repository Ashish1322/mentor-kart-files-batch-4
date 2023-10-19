import { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function PendingCard({ name, email, docId }) {
  const { handleAcceptReqeust, handleRejectReqeust } = useContext(ChatContext);

  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-6">
          <p className="mx-2 mt-1">{name}</p>
          <p className="mx-2 mt-1">{email}</p>
        </div>

        <div className="col col-3">
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleAcceptReqeust(docId)}
          >
            {" "}
            <i className="fa-solid fa-check"></i> Accept
          </button>
        </div>

        <div className="col col-3">
          <button
            onClick={() => handleRejectReqeust(docId)}
            className="btn btn-sm btn-danger"
          >
            {" "}
            <i className="fa-solid fa-xmark"></i> Reject
          </button>
        </div>
      </div>
    </div>
  );
}
