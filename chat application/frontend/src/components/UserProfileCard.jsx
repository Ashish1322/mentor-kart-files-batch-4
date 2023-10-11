import { useContext } from "react";
import ChatContext from "../../ChatContext";

export default function UserProfileCard() {
  const { logout, user } = useContext(ChatContext);

  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-8 d-flex">
          <img
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src="https://media.licdn.com/dms/image/D4D03AQFpbkC9OasrTw/profile-displayphoto-shrink_400_400/0/1675607073927?e=1702512000&v=beta&t=WlJLQs4OeYXfgTCrRxodI9XjCFY9vxv_uLSLFI5glRs"
          />
          <p className="mx-2 mt-1">{user && user.name}</p>
        </div>
        <div className="col col-4">
          <button onClick={logout} className="btn btn-sm btn-warning">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
