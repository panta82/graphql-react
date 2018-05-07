import React, { Component } from "react";
import { graphql, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import gql from "graphql-tag";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const ChannelList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>{channels.map(ch => <li key={ch.id}>{ch.name}</li>)}</ul>;
};

const BoundChannelList = graphql(gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`)(ChannelList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2 className="App-title">Test Apollo stuff</h2>
          </header>
          <BoundChannelList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
