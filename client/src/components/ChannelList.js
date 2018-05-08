import React from "react";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

import AddChannel from "./AddChannel";

export const ChannelList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const channelItems = channels.map(ch => {
    const className = `channel ${ch.id < 0 ? "optimistic" : ""}`;
    return (
      <div className={className} key={ch.id}>
        {ch.name}
      </div>
    );
  });

  return (
    <div className="channelsList">
      <AddChannel />
      {channelItems}
    </div>
  );
};

export const channelListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const BoundChannelList = graphql(channelListQuery)(ChannelList);

export default BoundChannelList;
