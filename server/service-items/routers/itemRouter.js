const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.get('/', itemController.getItems);
router.post('/add', itemController.addItem);
router.put('/edit/:id', itemController.editItem);
router.delete('/delete/:id', itemController.deleteItem);
router.get('/:id', itemController.itemDetail);
router.get('/ingredients/:id', itemController.getIngredient);
router.get('/category/:id', itemController.getCategory);

module.exports = router;
