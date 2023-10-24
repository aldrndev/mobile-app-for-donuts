const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.getUser);
router.post('/add', userController.addUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
