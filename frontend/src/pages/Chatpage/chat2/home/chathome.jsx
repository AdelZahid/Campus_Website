import React from "react";
import Left from "./left/Left.jsx"; // Change to uppercase 'Left'
import Right from "./right/right"; // Change to uppercase 'Right'

export default function ChatHome() {
  return (
    <div className="flex">
      <Left />
      <Right />
    </div>
  );
}
