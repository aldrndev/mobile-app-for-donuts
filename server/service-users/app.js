if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routers');
const { mongoConnect } = require('./config/connection');
const errorHandler = require('./middlewares/errorHandler');
const PORT = process.env.PORT || 4002;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorHandler);

(async () => {
  try {
    await mongoConnect();
    console.log('Successfully connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`This app is working on ${PORT}`);
    });
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
  }
})();
