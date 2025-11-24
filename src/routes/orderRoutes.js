const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.delete('/:id', authorize('admin'), orderController.deleteOrder);

module.exports = router;
