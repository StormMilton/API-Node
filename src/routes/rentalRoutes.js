const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const authenticateToken = require("../middleware/auth");

// Obtener todos los alquileres
router.get("/rentals", authenticateToken, rentalController.getAllRentals);

// Crear un nuevo alquiler
router.post("/rentals", authenticateToken, rentalController.createRental);

// Actualizar un alquiler existente
router.put("/rentals/:id", authenticateToken, rentalController.updateRental);

// Eliminar un alquiler
router.delete("/rentals/:id", authenticateToken, rentalController.deleteRental);

module.exports = router;
