const { MongoClient } = require('mongodb');

const DB_URI = process.env.MONGODB_URI;

let db = null;
const DB_NAME = 'C2_P3';

const mongoConnect = async () => {
  const client = new MongoClient(DB_URI);

  try {
    const database = client.db(DB_NAME);

    db = database;

    return database;
  } catch (error) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
