import React from "react";

import AddMessage from "./AddMessage";

const MessageList = ({ messages }) => {
  const messageElements = messages.map(message => {
    const className = `message ${message.id < 0 ? "optimistic" : ""}`;
    return (
      <div key={message.id} className={className}>
        {message.text}
      </div>
    );
  });

  return (
    <div className="messagesList">
      {messageElements}
      <AddMessage />
    </div>
  );
};

export default MessageList;
