const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const schema = require("./schema");

const port = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is a GraphQL server");
});

app.use(
  "/graphql",
  graphqlExpress({
    schema
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
  })
);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
});
