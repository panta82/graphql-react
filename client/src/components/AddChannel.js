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

    const mutateReq = {
      variables: {
        name: this.state.name
      },
      refetchQueries: [{ query: channelListQuery }]
    };

    this.props.mutate(mutateReq).then(
      () => {
        this.setState({
          name: ""
        });
      },
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
