const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Proteger todas las rutas

// Listar todos los pedidos
router.get('/', orderController.getAllOrders);
// Crear nuevo pedido
router.post('/', orderController.createOrder);
// Marcar pedido como completado (solo admin)
router.post('/:id/complete', authorize('admin'), orderController.completeOrder);
// Formulario de edición (solo admin)
router.get('/:id/edit', authorize('admin'), orderController.getEditForm);
// Actualizar pedido (solo admin)
router.put('/:id', authorize('admin'), orderController.updateOrder);
// Eliminar pedido (solo admin)
router.delete('/:id', authorize('admin'), orderController.deleteOrder);

module.exports = router;
