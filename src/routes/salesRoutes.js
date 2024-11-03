const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const authenticateToken = require('../middleware/auth');

// Rutas para gestionar ventas
router.get('/', authenticateToken, salesController.getAllSales);
router.post('/', authenticateToken, salesController.createSale);
router.put('/:id', authenticateToken, salesController.updateSale);
router.delete('/:id', authenticateToken, salesController.deleteSale);

module.exports = router;
