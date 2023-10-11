import React from "react";

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
  return (
    <div className="p-3">
      <div>
        <p style={receiverStyles}>Hi How are You</p>
      </div>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <p style={senderStyles}>Hi How are You</p>
      </div>

      <div>
        <p style={receiverStyles}>Hi How are You</p>
      </div>

      <div style={{ display: "flex", justifyContent: "end" }}>
        <p style={senderStyles}>Hi How are You</p>
      </div>
    </div>
  );
}
