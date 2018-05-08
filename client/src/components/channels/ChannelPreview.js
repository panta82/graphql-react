import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

const ChannelPreview = ({ data: { loading, error, channel } }) => {
  return (
    <div>
      <div className="channelName">{channel ? channel.name : "Loading..."}</div>

      <div>Loading messages...</div>
    </div>
  );
};

export const channelQuery = gql`
  query ChannelQuery($channelId: ID!) {
    channel(id: $channelId) {
      id
      name
    }
  }
`;

ChannelPreview.propTypes = {
  channelId: PropTypes.string.isRequired
};

export default graphql(channelQuery, {
  options: props => {
    return {
      variables: {
        channelId: props.channelId
      }
    };
  }
})(ChannelPreview);
