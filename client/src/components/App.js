import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { toIdValue, getMainDefinition } from "apollo-utilities";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import BoundChannelList from "./channels/ChannelList";
import NotFound from "./NotFound";
import ChannelDetails from "./channels/ChannelDetails";
import "./App.css";

function dataIdFromObject(ob) {
  if (ob && ob.__typename && ob.id !== undefined) {
    return `${ob.__typename}:${ob.id}`;
  }
  return null;
}

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql"
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8000/subscriptions",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
  ),
  cache: new InMemoryCache({
    cacheRedirects: {
      Query: {
        channel: (_, args) => {
          return toIdValue(
            dataIdFromObject({
              __typename: "Channel",
              id: args.id
            })
          );
        }
      }
    }
  })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">
              React + GraphQL Tutorial
            </Link>
            <Switch>
              <Route exact path="/" component={BoundChannelList} />
              <Route path="/channel/:channelId" component={ChannelDetails} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
