const Sequelize = require('sequelize');
const config = require('../config/config.json');

// Configuración de Sequelize
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

// Importar modelos
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Client = require('./client')(sequelize, Sequelize.DataTypes);
const Property = require('./property')(sequelize, Sequelize.DataTypes);
const Rental = require('./rental')(sequelize, Sequelize.DataTypes);
const Sale = require('./sale')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  Client,
  Property,
  Rental,
  Sale,
  sequelize,
  Sequelize,
};

// Definir relaciones entre modelos
User.hasOne(Client, { foreignKey: 'userId', as: 'client' });
Client.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Property, { foreignKey: 'id_agente', as: 'properties' });
Property.belongsTo(User, { foreignKey: 'id_agente', as: 'agent' });

Property.hasMany(Rental, { foreignKey: 'id_propiedad', as: 'rentals' });
Rental.belongsTo(Property, { foreignKey: 'id_propiedad', as: 'property' });

Property.hasMany(Sale, { foreignKey: 'id_propiedad', as: 'sales' });
Sale.belongsTo(Property, { foreignKey: 'id_propiedad', as: 'property' });

Client.hasMany(Rental, { foreignKey: 'id_cliente', as: 'rentals' });
Rental.belongsTo(Client, { foreignKey: 'id_cliente', as: 'client' });

Client.hasMany(Sale, { foreignKey: 'id_cliente', as: 'sales' });
Sale.belongsTo(Client, { foreignKey: 'id_cliente', as: 'client' });

module.exports = db;
