import React from "react";
import MessageList from "../messages/MessageList";

const ChannelDetails = () => {
  const channel = { name: "Test", messages: [] };
  return (
    <div>
      <div className="channelName">{channel.name}</div>
      <MessageList messages={channel.messages} />
    </div>
  );
};

export default ChannelDetails;
