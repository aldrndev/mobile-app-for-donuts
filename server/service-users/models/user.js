const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/connection');

class User {
  static getCollection() {
    const db = getDatabase();
    const collection = db.collection('Users');
    return collection;
  }

  static async findAll() {
    return this.getCollection().find().toArray();
  }

  static async createUser(user) {
    return this.getCollection().insertOne({
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }

  static async findById(id) {
    return this.getCollection().findOne({
      _id: new ObjectId(id),
    });
  }

  static async deleteById(id) {
    return this.getCollection().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = User;
