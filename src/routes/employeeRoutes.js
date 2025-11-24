const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect); // Protect all routes below

router.get('/', employeeController.getAllEmployees);
router.get('/new', authorize('admin'), employeeController.getCreateForm);
router.post('/', authorize('admin'), employeeController.createEmployee);
router.get('/:id/edit', authorize('admin'), employeeController.getEditForm);
router.put('/:id', authorize('admin'), employeeController.updateEmployee);
router.delete('/:id', authorize('admin'), employeeController.deleteEmployee);

module.exports = router;
