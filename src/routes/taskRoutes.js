const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Proteger todas las rutas

// Listar todas las tareas
router.get('/', taskController.getAllTasks);
// Formulario de nueva tarea
router.get('/new', taskController.getCreateForm);
// Crear tarea
router.post('/', taskController.createTask);
// Formulario de edición
router.get('/:id/edit', authorize('admin'), taskController.getEditForm);
// Actualizar tarea
router.put('/:id', authorize('admin'), taskController.updateTask);
// Marcar tarea como finalizada
router.post('/:id/complete', taskController.completeTask);
// Eliminar tarea
router.delete('/:id', authorize('admin'), taskController.deleteTask);

module.exports = router;
