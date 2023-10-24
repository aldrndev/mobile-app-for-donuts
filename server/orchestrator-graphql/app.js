if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {
  typeDefs: itemTypeDefs,
  resolvers: itemResolvers,
} = require('./schemas/items');
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require('./schemas/users');

(async () => {
  const server = new ApolloServer({
    typeDefs: [itemTypeDefs, userTypeDefs],
    resolvers: [itemResolvers, userResolvers],
    introspection: true,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server working at ${url}`);
})();
