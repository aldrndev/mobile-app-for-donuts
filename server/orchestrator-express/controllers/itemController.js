const axios = require('axios');
const redis = require('../config/connection');

const SERVER_ITEM_URL = 'http://localhost:4000/items';
const SERVER_USER_URL = 'http://localhost:4001/users';

const REDIS_KEY = 'itemsData';

module.exports = {
  getItems: async (req, res, next) => {
    try {
      let dataCached = await redis.get(REDIS_KEY);

      if (dataCached) {
        res.status(200).json(JSON.parse(dataCached));
      } else {
        const response = await axios({
          method: 'GET',
          url: `${SERVER_ITEM_URL}/show`,
        });

        if (response.status === 200) {
          await redis.set(REDIS_KEY, JSON.stringify(response.data.data));
          res.status(200).json(response.data.data);
        } else {
          throw new Error('Failed get item');
        }
      }
    } catch (error) {
      next(error);
    }
  },

  addItems: async (req, res, next) => {
    try {
      const response = await axios({
        url: `${SERVER_ITEM_URL}/add`,
        method: 'POST',
        data: req.body,
      });

      if (response.status === 201) {
        await redis.del(REDIS_KEY);

        res.status(201).json(response.data.data);
      } else {
        throw new Error('Failed add item');
      }
    } catch (error) {
      next(error);
    }
  },

  editItems: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await axios({
        url: `${SERVER_ITEM_URL}/edit/${id}`,
        method: 'PUT',
        data: req.body,
      });

      if (response.status === 200) {
        await redis.del(REDIS_KEY);

        res.status(200).json(response.data.data);
      } else {
        throw new Error('Failed edit item');
      }
    } catch (error) {
      next(error);
    }
  },

  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await axios({
        url: `${SERVER_ITEM_URL}/delete/${id}`,
        method: 'DELETE',
      });

      if (response.status === 200) {
        await redis.del(REDIS_KEY);

        res.status(200).json(response.data.data);
      } else {
        throw new Error('Failed delete item');
      }
    } catch (error) {
      next(error);
    }
  },

  itemDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const responseItem = await axios({
        method: 'GET',
        url: `${SERVER_ITEM_URL}/${id}`,
      });

      if (responseItem.status !== 200) {
        throw new Error('Failed get item');
      }

      const item = responseItem.data.data;

      const userResponse = await axios({
        method: 'GET',
        url: `${SERVER_USER_URL}/${item.authorId}`,
      });

      if (userResponse.status !== 200) {
        throw new Error('Failed get user');
      }

      delete userResponse.data.data.password;
      item.User = userResponse.data.data;

      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },
};
