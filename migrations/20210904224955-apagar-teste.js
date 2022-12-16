'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.createTable('users',{
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
          type: Sequelize.STRING,
          allowNull: true,
      },retorno: {
          type: Sequelize.STRING,
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
      },teste:{
        type: Sequelize.STRING,
        allowNull: true
      }
  
  })

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
