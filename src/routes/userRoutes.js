const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const userController = require('../controllers/userController');

// Ruta para registrar un usuario
router.post('/register', userController.register);

// Ruta de inicio de sesión
router.post('/login', userController.login);

// Ruta para obtener el perfil del usuario autenticado
router.get('/profile', authenticateToken, userController.getProfile);

// Ruta para obtener todos los usuarios (protegida)
router.get('/', authenticateToken, userController.getAllUsers);

// Ruta para actualizar un usuario existente
router.put('/:id', authenticateToken, userController.updateUser);

// Ruta para eliminar un usuario (solo accesible para administradores)
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;
