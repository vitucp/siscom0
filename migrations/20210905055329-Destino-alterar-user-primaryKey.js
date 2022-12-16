'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('destino', {

      user: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }

    });
    
  },

  down: async (queryInterface, Sequelize) => {



  }
};
