const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");

const schema = require("./schema");

const app = express();

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
    endpointURL: "/graphql"
  })
);

const port = process.env.PORT || 8000;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
