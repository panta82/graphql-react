import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

import { channelListQuery } from "./ChannelList";

export class AddChannel extends Component {
  static propTypes = {
    mutate: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name) {
      return;
    }

    this.setState({
      name: ""
    });

    const mutateReq = {
      variables: {
        name: this.state.name
      },
      optimisticResponse: {
        addChannel: {
          name: this.state.name,
          id: Math.random() * -10000000,
          __typename: "Channel"
        }
      },
      update: (store, { data: { addChannel } }) => {
        // Mutate data in cache
        const data = store.readQuery({ query: channelListQuery });
        data.channels.push(addChannel);
        store.writeQuery({ query: channelListQuery, data });
      }
    };

    this.props.mutate(mutateReq).then(
      () => {},
      err => {
        alert(err.message);
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="New channel"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <input type="submit" style={{ visibility: "hidden" }} />
      </form>
    );
  }
}

const BoundAddChannel = graphql(gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`)(AddChannel);

export default BoundAddChannel;
