require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.PORT || 3306, // Utilizar el puerto de .env o el predeterminado
});

async function createDatabase() {
    try {
        const dbName = process.env.DB_DATABASE; // Nombre de la base de datos desde el .env
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`);
        console.log(`Base de datos "${dbName}" creada exitosamente.`);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
        await sequelize.close();
    }
}

createDatabase();
