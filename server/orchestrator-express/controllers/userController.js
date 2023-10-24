const axios = require('axios');
const redis = require('../config/connection');

const SERVER_USER_URL = 'http://localhost:4001/users';

const REDIS_KEY = 'usersData';

module.exports = {
  getUser: async (req, res, next) => {
    try {
      let dataCached = await redis.get(REDIS_KEY);

      if (dataCached) {
        res.status(200).json(JSON.parse(dataCached));
      } else {
        const response = await axios({
          method: 'GET',
          url: `${SERVER_USER_URL}`,
        });

        if (response.status === 200) {
          await redis.set(REDIS_KEY, JSON.stringify(response.data.data));
          res.status(200).json(response.data.data);
        } else {
          throw new Error('Failed get user');
        }
      }
    } catch (error) {
      next(error);
    }
  },

  addUser: async (req, res, next) => {
    try {
      const response = await axios({
        url: `${SERVER_USER_URL}/add`,
        method: 'POST',
        data: req.body,
      });

      if (response.status === 201) {
        await redis.del(REDIS_KEY);

        res.status(201).json(response.data.data);
      } else {
        throw new Error('Failed add user');
      }
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await axios({
        url: `${SERVER_USER_URL}/delete/${id}`,
        method: 'DELETE',
      });

      if (response.status === 200) {
        await redis.del(REDIS_KEY);

        res.status(200).json(response.data.data);
      } else {
        throw new Error('Failed delete user');
      }
    } catch (error) {
      next(error);
    }
  },
};
