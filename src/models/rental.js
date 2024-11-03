module.exports = (sequelize, DataTypes) => {
  const Rental = sequelize.define("Rental", {
    rentalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_inicio",
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "fecha_fin",
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "monto_mensual",
    },
  });

  Rental.associate = (models) => {
    Rental.belongsTo(models.Property, {
      foreignKey: "id_propiedad",
      as: "property",
    });
    Rental.belongsTo(models.Client, {
      foreignKey: "id_cliente",
      as: "client",
    });
  };

  return Rental;
};
