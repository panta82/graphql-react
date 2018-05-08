import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo/index";
import gql from "graphql-tag";

export class AddMessage extends Component {
  static propTypes = {
    mutate: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
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
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`)(AddMessage);

export default BoundAddMessage;
