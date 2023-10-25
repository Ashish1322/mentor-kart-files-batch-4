import { useContext } from "react";
import ChatContext from "../../ChatContext";

const senderStyles = {
  backgroundColor: "lightpink",
  width: "fit-content",
  padding: 7,
  borderRadius: 10,
  borderBottomRightRadius: 0,
  margin: 10,
};

const receiverStyles = {
  backgroundColor: "lightblue",
  width: "fit-content",
  padding: 7,
  borderRadius: 10,
  borderTopLeftRadius: 0,
  margin: 10,
};

export default function Messages() {
  const { messages, user } = useContext(ChatContext);
  return (
    <div className="p-3" style={{ overflow: "scroll" }}>
      {messages.map((item, index) =>
        item.sender == user._id ? (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <p style={senderStyles}>{item.message}</p>
          </div>
        ) : (
          <div key={index}>
            <p style={receiverStyles}>{item.message}</p>
          </div>
        )
      )}
    </div>
  );
}
