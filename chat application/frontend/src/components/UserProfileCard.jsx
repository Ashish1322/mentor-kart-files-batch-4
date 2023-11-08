import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import ChatContext from "../../ChatContext";

export default function UserProfileCard() {
  const { logout, user, BASE_URL, setUser } = useContext(ChatContext);
  const imageRef = useRef();

  const fileChange = (e) => {
    const filetoupload = e.currentTarget.files[0];

    let myFormData = new FormData();

    myFormData.append("profilepic", filetoupload);

    fetch(`${BASE_URL}/auth/upload/profile-pic`, {
      method: "POST",
      headers: {
        Authorization: user.token,
      },
      body: myFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        // set the new data in local storage
        localStorage.setItem(
          "chatuser",
          JSON.stringify({ ...user, profilePic: data.profilePic })
        );
        setUser({ ...user, profilePic: data.profilePic });
      })
      .catch((err) => toast.error("Failed To Upload the file" + err.message));
  };

  return (
    <div className="card p-2" style={{ width: "100%", borderRadius: 0 }}>
      <div className="row">
        <div className="col col-8 d-flex">
          <input
            onChange={fileChange}
            ref={imageRef}
            style={{ display: "none" }}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />

          <img
            onClick={() => imageRef.current.click()}
            className="rounded-circle mt-1"
            width={30}
            height={30}
            src={user && user.profilePic}
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
