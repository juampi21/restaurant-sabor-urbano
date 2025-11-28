const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Proteger todas las rutas

// Listar inventario
router.get('/', inventoryController.getInventory);
// Crear insumo
router.post('/supplies', inventoryController.createSupply);
// Formulario de edición
router.get('/supplies/:id/edit', inventoryController.getEditForm);
// Actualizar insumo
router.put('/supplies/:id', inventoryController.updateSupply);
// Eliminar insumo (solo admin)
router.delete('/supplies/:id', authorize('admin'), inventoryController.deleteSupply);

module.exports = router;
