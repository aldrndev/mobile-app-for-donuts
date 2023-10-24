const axios = require('axios');
const redis = require('../config/connection');

const SERVICE_ITEMS_URL = 'http://service-item:4001/items';
const SERVICE_USERS_URL = 'http://service-user:4002/users';

const REDIS_ITEMS_KEY = 'itemsData';

const typeDefs = `#graphql 
type Item {
    id: ID!
    name: String
    description: String
    price: Int
    imgUrl: String
    createdAt: String
    updatedAt: String
    Category: Category
    Ingredients: [Ingredient]
    User: User
}

type Ingredient {
    id: ID!
    itemId: Int
    name: String
}

type Category {
    id: ID!
    name: String
}

type User {
    _id: ID!
    email: String
    role: String
    phoneNumber: String
    address: String
}

input ItemInput {
    name: String
    description: String
    price: Float
    imgUrl: String
    authorId: String
    categoryId: Int
    ingredients: [String]
}

type Query {
    getAllItems: [Item]
    itemDetail(id: Int!): Item
}

type Mutation {
    addItem(input: ItemInput!): Item
    editItem(id: Int!, input: ItemInput!): Item
    deleteItem(id: Int!): String
}

`;

const resolvers = {
  Query: {
    getAllItems: async () => {
      try {
        const cachedItems = await redis.get(REDIS_ITEMS_KEY);
        if (cachedItems) {
          return JSON.parse(cachedItems);
        }
        const { data } = await axios.get(SERVICE_ITEMS_URL);
        await redis.set(REDIS_ITEMS_KEY, JSON.stringify(data.data));
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching items.');
      }
    },
    itemDetail: async (_, { id }) => {
      try {
        const { data } = await axios.get(`${SERVICE_ITEMS_URL}/${id}`);
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching the item detail.');
      }
    },
  },
  Item: {
    User: async (parent) => {
      try {
        const userId = parent.authorId;
        const { data } = await axios.get(`${SERVICE_USERS_URL}/${userId}`);
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching user data.');
      }
    },
    Ingredients: async (parent) => {
      try {
        const itemId = parent.id;
        const { data } = await axios.get(
          `${SERVICE_ITEMS_URL}/ingredients/${itemId}`
        );
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching the ingredients.');
      }
    },
    Category: async (parent) => {
      try {
        const categoryId = parent.categoryId;
        const { data } = await axios.get(
          `${SERVICE_ITEMS_URL}/category/${categoryId}`
        );
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while fetching the category.');
      }
    },
  },
  Mutation: {
    addItem: async (_, { input }) => {
      try {
        const { data } = await axios.post(`${SERVICE_ITEMS_URL}/add`, input);
        await redis.del(REDIS_ITEMS_KEY);
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while adding the item.');
      }
    },
    editItem: async (_, { id, input }) => {
      try {
        const { data } = await axios.put(
          `${SERVICE_ITEMS_URL}/edit/${id}`,
          input
        );
        await redis.del(REDIS_ITEMS_KEY);
        return data.data;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while editing the item.');
      }
    },
    deleteItem: async (_, { id }) => {
      try {
        await axios.delete(`${SERVICE_ITEMS_URL}/delete/${id}`);
        await redis.del(REDIS_ITEMS_KEY);
        return `Item with ID: ${id} was deleted successfully.`;
      } catch (error) {
        console.log(error.response.data.message);
        throw new Error('An error occurred while deleting the item.');
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
