const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Client extends Model {}

  Client.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, field: 'nombre' },
      documentId: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'documento_identidad' },
      phone: { type: DataTypes.STRING, allowNull: true, field: 'telefono' },
      userId: { type: DataTypes.INTEGER, allowNull: false, field: 'id_usuario' } // Relación con usuario
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "clients"
    }
  )

  return Client;
};