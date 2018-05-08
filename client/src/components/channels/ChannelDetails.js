import React from "react";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

import MessageList from "../messages/MessageList";
import NotFound from "../NotFound";

const ChannelDetails = ({ data: { loading, error, channel }, match }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!channel) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="channelName">{channel.name}</div>
      <MessageList messages={channel.messages} />
    </div>
  );
};

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default graphql(channelDetailsQuery, {
  options: props => {
    return {
      variables: {
        channelId: props.match.params.channelId
      }
    };
  }
})(ChannelDetails);
