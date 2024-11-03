const { Property } = require('../models');

// Obtener todas las propiedades disponibles
exports.getAvailableProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({ where: { status: 'disponible' } });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error obteniendo propiedades:", error);
    res.status(500).json({ message: "Error obteniendo propiedades" });
  }
};

// Registrar una nueva propiedad
exports.createProperty = async (req, res) => {
  const { address, type, price, description, size, agentId } = req.body;

  console.log("Cuerpo solicitud: ", req.body)

  if (req.user.role !== 'admin' && req.user.role !== 'agente') {
    return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
  }

  try {
    const newProperty = await Property.create({ 
        address,
        type,
        price,
        description, 
        size,
        agentId 
    });
    res.status(201).json({ 
        message: "Propiedad registrada exitosamente",
        property: {
            address: newProperty.address,
            type: newProperty.type,
            price: newProperty.price,
            description: newProperty.description,
            size: newProperty.size,
            agentId: newProperty.agentId,
        },
    });
  } catch (error) {
    console.error("Error registrando propiedad:", error);
    res.status(500).json({ message: "Error registrando propiedad" });
  }
};

// Actualizar una propiedad
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const { address, type, price, description, size, status } = req.body;

  if (req.user.role !== 'admin' && req.user.role !== 'agente') {
    return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
  }

  try {
    const property = await Property.findByPk(id);
    if (!property) return res.status(404).json({ message: "Propiedad no encontrada" });

    await property.update({ address, type, price, description, size, status });
    res.status(200).json({ message: "Propiedad actualizada exitosamente", property });
  } catch (error) {
    console.error("Error actualizando propiedad:", error);
    res.status(500).json({ message: "Error actualizando propiedad" });
  }
};

// Eliminar una propiedad
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
  }

  try {
    const property = await Property.findByPk(id);
    if (!property) return res.status(404).json({ message: "Propiedad no encontrada" });

    await property.destroy();
    res.status(200).json({ message: "Propiedad eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando propiedad:", error);
    res.status(500).json({ message: "Error eliminando propiedad" });
  }
};
