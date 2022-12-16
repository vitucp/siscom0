const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../../database/database");
const User = require('../../users/Users')
const Contrato = require('../tabela/contrato')


const Faturas = connection.define('faturas',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },nrFatura: {
        type: Sequelize.STRING,
        allowNull: true,
    },nrOb: {
        type: Sequelize.STRING,
        allowNull: true,
    },vencimento: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },dataEntregaTesouraria: {
        type: Sequelize.STRING,
        allowNull: true, 
    },dataOb: {
        type: Sequelize.STRING,
        allowNull: true,
    },valor: {
        type: Sequelize.STRING,
        allowNull: true,
    },contratoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },notificacao:{
        type: Sequelize.STRING,
        allowNull: true,
    },DataPreenchimento:{
        type: Sequelize.STRING,
        allowNull: true,
    }
})



Faturas.belongsTo(Contrato,  ); // UM Artigo pertence a uma categoria
Contrato.hasMany(Faturas ); // UMA Categoria tem muitos artigos
// POssivel solucao para problemas futuros com alteracoes no banco 
// Faturas.sync({alter: true})
// Faturas.sync({force: true})

module.exports = Faturas;