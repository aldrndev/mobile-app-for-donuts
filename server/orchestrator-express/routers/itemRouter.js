const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.get('/', itemController.getItems);
router.post('/add', itemController.addItems);
router.put('/edit/:id', itemController.editItems);
router.delete('/delete/:id', itemController.deleteItem);
router.get('/:id', itemController.itemDetail);

module.exports = router;
