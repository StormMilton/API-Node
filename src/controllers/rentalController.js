const { Rental, Property, Client } = require("../models");

// Obtener todos los alquileres
exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.findAll({
      include: [
        { model: Property, as: "property" },
        { model: Client, as: "client" },
      ],
    });
    res.status(200).json(rentals);
  } catch (error) {
    console.error("Error al obtener los alquileres:", error);
    res.status(500).json({ message: "Error al obtener los alquileres" });
  }
};

// Crear un nuevo alquiler
exports.createRental = async (req, res) => {
  const { rentalDate, returnDate, totalAmount, propertyId, clientId } = req.body;
  console.log("Datos recibidos para crear alquiler:", { rentalDate, returnDate, totalAmount, propertyId, clientId });
  console.log("Usuario autenticado en la solicitud:", req.user);

  try {
    // Verificar si la propiedad está disponible
    const property = await Property.findByPk(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }
    if (property.status !== 'Disponible') {
      return res.status(400).json({ message: "La propiedad no está disponible para alquilar" });
    }

    // Crear el alquiler
    const rental = await Rental.create({
      rentalDate,
      returnDate,
      totalAmount,
      id_propiedad: propertyId,
      id_cliente: clientId,
    });

    // Cambiar el estado de la propiedad a "no disponible"
    property.status = 'no disponible';
    await property.save();

    res.status(201).json(rental);
  } catch (error) {
    console.error("Error al registrar alquiler:", error);
    res.status(500).json({ message: "Error al registrar alquiler" });
  }
};

// Actualizar un alquiler existente
exports.updateRental = async (req, res) => {
  const { id } = req.params;
  const { rentalDate, returnDate, totalAmount } = req.body;
  try {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      return res.status(404).json({ message: "Alquiler no encontrado" });
    }
    await rental.update({ rentalDate, returnDate, totalAmount });
    res.status(200).json(rental);
  } catch (error) {
    console.error("Error al actualizar alquiler:", error);
    res.status(500).json({ message: "Error al actualizar alquiler" });
  }
};

// Eliminar un alquiler
exports.deleteRental = async (req, res) => {
  const { id } = req.params;
  try {
    const rental = await Rental.findByPk(id);
    if (!rental) {
      return res.status(404).json({ message: "Alquiler no encontrado" });
    }
    await rental.destroy();
    res.status(200).json({ message: "Alquiler eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar alquiler:", error);
    res.status(500).json({ message: "Error al eliminar alquiler" });
  }
};
