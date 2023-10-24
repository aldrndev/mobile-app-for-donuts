const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getAllUser);
router.get('/:id', userController.getUserDetail);

router.post('/add', userController.addUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
