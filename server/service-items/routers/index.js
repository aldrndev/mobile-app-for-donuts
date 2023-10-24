const express = require('express');
const router = express.Router();
const itemRouter = require('./itemRouter');

router.use('/items', itemRouter);

module.exports = router;
