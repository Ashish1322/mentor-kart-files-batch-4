import React from "react";
import Friends from "./Friends";

import UserProfileCard from "./UserProfileCard";

export default function LeftSideBar() {
  return (
    <div style={{ border: "1px solid #d5d5d5", padding: 0 }}>
      <UserProfileCard />
      <Friends />
    </div>
  );
}
