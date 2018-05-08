import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import BoundChannelList from "./channels/ChannelList";
import NotFound from "./NotFound";
import ChannelDetails from "./channels/ChannelDetails";
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
