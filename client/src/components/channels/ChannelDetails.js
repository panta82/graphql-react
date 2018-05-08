import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

import MessageList from "../messages/MessageList";
import NotFound from "../NotFound";
import ChannelPreview from "./ChannelPreview";

class ChannelDetails extends Component {
  static propTypes = {
    data: PropTypes.object,
    match: PropTypes.object
  };

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageAdded;
        const duplicate = prev.channel.messages.find(
          msg => msg.id === newMessage.id
        );
        if (duplicate) {
          return prev;
        }

        return {
          ...prev,
          channel: {
            ...prev.channel,
            messages: [...prev.channel.messages, newMessage]
          }
        };
      }
    });
  }

  render() {
    const {
      data: { loading, error, channel },
      match
    } = this.props;

    if (loading) {
      return <ChannelPreview channelId={match.params.channelId} />;
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
  }
}

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

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
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
