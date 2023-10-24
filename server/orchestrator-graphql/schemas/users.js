const axios = require('axios');
const redis = require('../config/connection');

const SERVICE_USERS_URL = 'http://service-user:4002/users';

const REDIS_USERS_KEY = 'usersData';

const typeDefs = `#graphql

type User {
    _id: ID!
    email: String
    role: String
    phoneNumber: String
    address: String
}

input UserInput {
   email: String
   password: String
   phoneNumber: String
   address: String
}

type Query {
    getAllUsers: [User]
    userDetail(id: String!): User
}

type Mutation {
    addUser(input: UserInput!): String
    deleteUser(id: String!): String
}
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const cachedItems = await redis.get(REDIS_USERS_KEY);
        if (cachedItems) {
          return JSON.parse(cachedItems);
        }
        const { data } = await axios.get(SERVICE_USERS_URL);
        await redis.set(REDIS_USERS_KEY, JSON.stringify(data.data));
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching users.');
      }
    },
    userDetail: async (_, { id }) => {
      try {
        const { data } = await axios.get(`${SERVICE_USERS_URL}/${id}`);
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching the user detail.');
      }
    },
  },

  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const { data } = await axios.post(`${SERVICE_USERS_URL}/add`, input);
        await redis.del(REDIS_USERS_KEY);
        return `Account id ${data.data.insertedId} has been created`;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while adding the user.');
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await axios.delete(`${SERVICE_USERS_URL}/delete/${id}`);
        await redis.del(REDIS_USERS_KEY);
        await redis.del(`item_${id}`);
        return `User with ID: ${id} was deleted successfully.`;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while deleting the user.');
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
