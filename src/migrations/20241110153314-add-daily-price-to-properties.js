'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('properties', 'daily_price', {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0.0,
      });
  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn('properties', 'daily_price');
  },
};