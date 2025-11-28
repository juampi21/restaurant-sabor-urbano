const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para inicio de sesión
router.get('/login', authController.getLogin);
router.post('/login', authController.login);
// Rutas para registro
router.get('/register', authController.getRegister);
router.post('/register', authController.register);
// Ruta para cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;
