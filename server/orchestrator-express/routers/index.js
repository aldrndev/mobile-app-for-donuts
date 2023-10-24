const express = require('express');
const router = express.Router();
const itemRouter = require('./itemRouter');
const userRouter = require('./userRouter');

router.use('/items', itemRouter);
router.use('/users', userRouter);

module.exports = router;
