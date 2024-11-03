const { Client } = require("../models");

// Obtener todos los clientes
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error obteniendo clientes:", error);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
};

// Crear un cliente nuevo
exports.createClient = async (req, res) => {
  const { name, documentId, phone, userId } = req.body;
  try {
    const client = await Client.create({ name, documentId, phone, userId });
    res.status(201).json(client);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ message: "Error al crear cliente" });
  }
};

// Actualizar un cliente
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, documentId, phone } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "Cliente no encontrado" });

    await client.update({ name, documentId, phone });
    res.status(200).json(client);
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "Cliente no encontrado" });

    await client.destroy();
    res.status(200).json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ message: "Error al eliminar cliente" });
  }
};
