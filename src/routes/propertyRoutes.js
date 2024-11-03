const express = require('express');
const propertyController = require('../controllers/propertyController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.get('/properties', propertyController.getAvailableProperties); // Obtener propiedades disponibles
router.post('/properties', authenticateToken, propertyController.createProperty); // Registrar propiedad
router.put('/properties/:id', authenticateToken, propertyController.updateProperty); // Actualizar propiedad
router.delete('/properties/:id', authenticateToken, propertyController.deleteProperty); // Eliminar propiedad

module.exports = router;
