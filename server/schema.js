const { makeExecutableSchema } = require("graphql-tools");
const gql = require("graphql-tag");

const resolvers = require("./resolvers");

const typeDefs = gql`
  type Channel {
    id: ID!
    name: String
  }

  type Query {
    channels: [Channel]
  }

  type Mutation {
    addChannel(name: String!): Channel
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
