const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Sale extends Model {
    static associate(models) {
      // Relaciones
      Sale.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
      Sale.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
    }
  }

  Sale.init(
    {
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_propiedad",
        references: {
          model: 'Properties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_cliente",
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      salePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "monto_total",
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_venta",
      }
    },
    {
      sequelize,
      modelName: 'Sale',
      tableName: 'sales',
    }
  );

  return Sale;
};
