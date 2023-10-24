const Redis = require('ioredis');

const redis = new Redis({
  port: 12013, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: 'default', // needs Redis >= 6
  password: process.env.REDIS_PW,
  db: 0, // Defaults to 0
});

module.exports = redis;
