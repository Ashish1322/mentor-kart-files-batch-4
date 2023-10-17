import { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function Pending({ name }) {
  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-6 d-flex">
          <p className="mx-2 mt-1">{name}</p>
        </div>

        <div className="col col-3">
          <button className="btn btn-sm btn-success">A</button>
        </div>

        <div className="col col-3">
          <button className="btn btn-sm btn-danger">R</button>
        </div>
      </div>
    </div>
  );
}
