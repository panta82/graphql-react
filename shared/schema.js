const typeDefs = `
  type Channel {
    id: ID!
    name: String
  }
  
  type Query {
    channels: [Channel]
  }
`;

module.exports = {
  typeDefs
};
