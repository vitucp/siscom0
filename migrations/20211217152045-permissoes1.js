'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {'Permissoes', 'userId', {



    type: Sequelize.INTEGER, 
    allowNull: true,    
    references: {model: 'permissoes', key: 'id'},
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',



  }
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
