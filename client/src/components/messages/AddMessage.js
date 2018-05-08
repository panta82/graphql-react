import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";
import { channelDetailsQuery } from "../channels/ChannelDetails";

export class AddMessage extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    match: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    const text = this.state.text;
    this.setState({
      text: ""
    });

    const channelId = this.props.match.params.channelId;

    this.props.mutate({
      variables: {
        message: {
          channelId,
          text
        }
      },
      optimisticResponse: {
        addMessage: {
          text,
          id: Math.round(Math.random() * -100000000)
        }
      },
      update: (store, { data: { addMessage } }) => {
        const data = store.readQuery({
          query: channelDetailsQuery,
          variables: {
            channelId
          }
        });

        const duplicate = data.channel.messages.find(
          msg => msg.id === addMessage.id
        );
        if (!duplicate) {
          data.channel.messages.push(addMessage);
        }

        store.writeQuery({
          query: channelDetailsQuery,
          variables: {
            channelId
          },
          data
        });
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="New message"
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <input type="submit" style={{ visibility: "hidden" }} />
      </form>
    );
  }
}

const BoundAddMessage = graphql(gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`)(withRouter(AddMessage));

export default BoundAddMessage;
