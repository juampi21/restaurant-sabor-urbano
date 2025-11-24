const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', inventoryController.getInventory);
router.post('/supplies', inventoryController.createSupply);
router.delete('/supplies/:id', authorize('admin'), inventoryController.deleteSupply);

module.exports = router;
