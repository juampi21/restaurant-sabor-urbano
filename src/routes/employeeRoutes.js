const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Proteger todas las rutas siguientes

// Listar todos los empleados
router.get('/', employeeController.getAllEmployees);
// Formulario de nuevo empleado (solo admin)
router.get('/new', authorize('admin'), employeeController.getCreateForm);
// Crear empleado (solo admin)
router.post('/', authorize('admin'), employeeController.createEmployee);
// Formulario de edición (solo admin)
router.get('/:id/edit', authorize('admin'), employeeController.getEditForm);
// Actualizar empleado (solo admin)
router.put('/:id', authorize('admin'), employeeController.updateEmployee);
// Eliminar empleado (solo admin)
router.delete('/:id', authorize('admin'), employeeController.deleteEmployee);

module.exports = router;
