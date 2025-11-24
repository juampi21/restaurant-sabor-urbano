const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', taskController.getAllTasks);
router.get('/new', taskController.getCreateForm);
router.post('/', taskController.createTask);
router.get('/:id/edit', taskController.getEditForm);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
