const User = require('../models/user');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await User.findAll();

      if (users.length === 0) {
        throw new Error('User not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: 'Success get data for all users',
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },

  addUser: async (req, res, next) => {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const newUser = await User.createUser({
        email,
        password,
        role: 'admin',
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: `Success register account for id ${newUser.insertedId}`,
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userDetail = await User.findById(id);

      if (!userDetail) {
        throw new Error('User not found');
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success get detail for user ${userDetail.email}`,
        data: userDetail,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedUser = await User.findById(id);

      if (!deletedUser) {
        throw new Error('User not found');
      }

      await User.deleteById(id);

      res.status(200).json({
        statusCode: 200,
        message: `Success deleted ${deletedUser.email} from database`,
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  },
};
