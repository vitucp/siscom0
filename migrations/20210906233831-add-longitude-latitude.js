'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   

 
     
  },

  down: async (queryInterface, Sequelize) => {


    
    await queryInterface.removeColumn('users', 'coordenadas', {
      type: Sequelize.GEOMETRY('POINT') 
    });
  }
};
