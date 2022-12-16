'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 /*
      await queryInterface.addColumn('placasmaes', 'quantidade', { 
        type: Sequelize.DECIMAL,
        allowNull: true
      });
    */ 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
