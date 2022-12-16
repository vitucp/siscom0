'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {



    
  },

  down: async (queryInterface, Sequelize) => {
    

      await queryInterface.dropTable('users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      nomeGuerra: {
          type: Sequelize.STRING,
          allowNull: false
      },nome:{
          type: Sequelize.STRING,
          allowNull: true
      },graduacao:{
          type: Sequelize.STRING,
          allowNull: true
      },sessao:{
          type: Sequelize.STRING,
          allowNull: true
      },email:{
          type: Sequelize.STRING,
          allowNull: false
      },password: {
          type: Sequelize.STRING,
          allowNull: false                 
      },whatsapp:{
          type: Sequelize.STRING,
          allowNull: true 
      },tel2: {
          type: Sequelize.STRING,
          allowNull: true 
      },cpf: {
          type: Sequelize.STRING,
          allowNull: true 
      },rg: {
          type: Sequelize.STRING,
          allowNull: true 
      },cep: {
          type: Sequelize.STRING,
          allowNull: true 
      },rua: {
          type: Sequelize.STRING,
          allowNull: true 
      },numeroCasa:{
          type: Sequelize.STRING,
          allowNull: true 
      },bairro:{
          type: Sequelize.STRING,
          allowNull: true 
      },localizacao: {
          type: Sequelize.STRING,
          allowNull: true 
      },dataPartida: {
          type: Sequelize.DATEONLY,
          allowNull: true,
      },retorno: {
          type: Sequelize.DATEONLY,
          allowNull: true,
      },sexo: {
          type: Sequelize.STRING,
          allowNull: true
      },status: {
          type: Sequelize.STRING,
          allowNull: true
      },ultimaAlteracaoPor:{
          type: Sequelize.INTEGER,
          allowNull: true
      },dataUltimaAlteracao:{
          type: Sequelize.STRING,
          allowNull: true
      },funcao: {
          type: Sequelize.STRING,
          allowNull: true
      },logitude: {
          type: Sequelize.FLOAT,
          allowNull: true  
      },latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
      }
  

      });
    
  }
};
