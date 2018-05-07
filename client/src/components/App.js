import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import BoundChannelList from "./ChannelList";

import logo from "./logo.svg";
import "./App.css";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8000/graphql"
  }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <BoundChannelList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
