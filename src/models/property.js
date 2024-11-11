const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.json'); 

module.exports = (sequelize) => {
  class Property extends Model {}

  Property.init(
    {
      address: { type: DataTypes.STRING, allowNull: false, field: "direccion" },
      type: { type: DataTypes.STRING, allowNull: false, field: "tipo" }, // Ejemplo: 'casa', 'departamento'
      price: { type: DataTypes.DECIMAL, allowNull: false, field: "precio" },
      daily_price: { type: DataTypes.DECIMAL, allowNull: true, field: "daily_price"},
      status: { type: DataTypes.STRING, allowNull: false, field: "estado", defaultValue: 'disponible' }, // Ejemplo: 'disponible', 'alquilada', 'vendida'
      image: {
        type: DataTypes.STRING,
        allowNull: true, 
        defaultValue: null, // Puede ser null si no se provee una imagen
        comment: "URL de la imagen de la propiedad (opcional)"
    },
      description: { type: DataTypes.TEXT, allowNull: true, field: "descripcion"  },
      size: { type: DataTypes.DECIMAL, allowNull: true, field: "tamaño" },
      agentId: { type: DataTypes.INTEGER, allowNull: false, field: "id_agente", references: { model: 'Users', key: 'id' } }, // Relación con el agente
      daily_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      }
    },
    {
      sequelize,
      modelName: 'Property',
      tableName: 'properties',
    }
  );

  return Property;
};

