import React from "react";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

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

    let content = ch.name;
    if (ch.id >= 0) {
      content = <Link to={`channel/${ch.id}`}>{content}</Link>;
    }

    return (
      <div className={className} key={ch.id}>
        {content}
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
