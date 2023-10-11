import { useContext, useEffect } from "react";
import ChatContext from "../../ChatContext";
import { useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
export default function Home() {
  const { user } = useContext(ChatContext);
  const navigate = useNavigate();

  // check for user is logged in or not login, if not then redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mt-5 p-0">
      <div style={{ display: "flex", gap: "20px", height: "80vh" }}>
        <LeftSideBar />
        <RightSideBar />
      </div>
    </div>
  );
}
