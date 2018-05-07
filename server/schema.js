const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");
const { typeDefs } = require("../shared/schema");

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema });

module.exports = schema;
