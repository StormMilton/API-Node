const { Sale, Property, Client } = require('../models');

// Obtener todas las ventas
exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [{ model: Property, as: 'property' }, { model: Client, as: 'client' }],
    });
    res.status(200).json(sales);
  } catch (error) {
    console.error("Error obteniendo ventas:", error);
    res.status(500).json({ error: "Error obteniendo ventas" });
  }
};

// Registrar una nueva venta
exports.createSale = async (req, res) => {
  const { propertyId, clientId, salePrice, saleDate } = req.body;
  try {
    // Verificar si la propiedad está disponible
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }
    if (property.status !== 'disponible') {
      return res.status(400).json({ message: "La propiedad no está disponible para vender" });
    }

    // Crear la venta
    const newSale = await Sale.create({
      propertyId,
      clientId,
      salePrice,
      saleDate,
    });

    // Cambiar el estado de la propiedad a "no disponible"
    property.status = 'no disponible';
    await property.save();

    res.status(201).json(newSale);
  } catch (error) {
    console.error("Error registrando venta:", error);
    res.status(500).json({ error: "Error registrando venta" });
  }
};


// Actualizar una venta
exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const { salePrice, saleDate } = req.body;
  try {
    const sale = await Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    await sale.update({ salePrice, saleDate });
    res.status(200).json(sale);
  } catch (error) {
    console.error("Error actualizando venta:", error);
    res.status(500).json({ error: "Error actualizando venta" });
  }
};

// Eliminar una venta
exports.deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByPk(id);
    if (!sale) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    await sale.destroy();
    res.status(200).json({ message: "Venta eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando venta:", error);
    res.status(500).json({ error: "Error eliminando venta" });
  }
};
