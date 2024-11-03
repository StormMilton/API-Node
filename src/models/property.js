const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.json'); 

module.exports = (sequelize) => {
  class Property extends Model {}

  Property.init(
    {
      address: { type: DataTypes.STRING, allowNull: false, field: "direccion" },
      type: { type: DataTypes.STRING, allowNull: false, field: "tipo" }, // Ejemplo: 'casa', 'departamento'
      price: { type: DataTypes.DECIMAL, allowNull: false, field: "precio" },
      status: { type: DataTypes.STRING, allowNull: false, field: "estado", defaultValue: 'disponible' }, // Ejemplo: 'disponible', 'alquilada', 'vendida'
      description: { type: DataTypes.TEXT, allowNull: true, field: "descripcion"  },
      size: { type: DataTypes.DECIMAL, allowNull: true, field: "tamaño" },
      agentId: { type: DataTypes.INTEGER, allowNull: false, field: "id_agente", references: { model: 'Users', key: 'id' } }, // Relación con el agente
    },
    {
      sequelize,
      modelName: 'Property',
      tableName: 'properties',
    }
  );

  return Property;
};

