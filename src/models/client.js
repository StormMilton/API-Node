const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Client extends Model {}

  Client.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      documentId: { type: DataTypes.STRING, allowNull: false, unique: true },
      phone: { type: DataTypes.STRING, allowNull: true },
      userId: { type: DataTypes.INTEGER, allowNull: false } // Relación con usuario
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "clients"
    }
  )

  return Client;
};