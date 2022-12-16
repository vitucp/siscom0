const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../../database/database");
const User = require('../../users/Users')


const Selo = connection.define('selo',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },cnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },Ccnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },validadeCnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },modeloVeiculo:{
        type: Sequelize.STRING,
        allowNull: true 
    },chassi:{
        type: Sequelize.STRING,
        allowNull: true 
    },anoDeFabricacao:{
        type: Sequelize.STRING,
        allowNull: true 
    },ipva:{
        type: Sequelize.STRING,
        allowNull: true  
    },renavam:{
        type: Sequelize.STRING,
        allowNull: true 
    },placa:{
        type: Sequelize.STRING,
        allowNull: true 
    },cor:{
        type: Sequelize.STRING,
        allowNull: true 
    },nSelo:{
        type: Sequelize.STRING,
        allowNull: true 
    },pathDocumentos:{
        type: Sequelize.STRING,
        allowNull: true
    }
})




// Possivel solucao para problemas futuros com alteracoes no banco 
// Selo.sync({alter: true})
// Selo.sync({force: true})

module.exports = Selo;