const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config.json'); 

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize, // Pasamos la instancia de sequelize como parámetro aquí
      modelName: 'User',
      tableName: 'users', // Asegúrate de definir el nombre de la tabla si es necesario
    }
  );

  return User;
};
