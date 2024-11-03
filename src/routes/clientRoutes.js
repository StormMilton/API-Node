const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const authenticateToken = require("../middleware/auth");

// Rutas de clientes
router.get("/", authenticateToken, clientController.getClients);
router.post("/", authenticateToken, clientController.createClient);
router.put("/:id", authenticateToken, clientController.updateClient);
router.delete("/:id", authenticateToken, clientController.deleteClient);

module.exports = router;
