import { useEffect, useContext } from "react";
import TodoContext from "../TodoContext";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { user } = useContext(TodoContext);
  const navigate = useNavigate();
  // if the compopnent is loading first time
  useEffect(() => {
    // if user doen'st exitst
    if (!user) {
      navigate("/");
    }
  }, []);

  return <div>Welcome To Website</div>;
}
