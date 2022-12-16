const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../../database/database");
const User = require('../../users/Users')

const Contrato = connection.define('contratos',{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },Ncontrato: {
        type: Sequelize.STRING,
        allowNull: true,
    },titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },descricao: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },notificacao: {
        type: Sequelize.STRING,
        allowNull: false,
    },dataInicio: {
        type: Sequelize.STRING,
        allowNull: true,
    },dataTermino: {
        type: Sequelize.STRING,
        allowNull: true,
    },status: {
        type: Sequelize.STRING,
        allowNull: false,
    },empresa: {
        type: Sequelize.STRING,
        allowNull: true
    },cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
    },telefoneEmpresa: {
        type: Sequelize.STRING,
        allowNull: true
    },emailEmpresa: {
        type: Sequelize.STRING,
        allowNull: true,
    },ultimaAlteracao: {
        type: Sequelize.STRING,
        allowNull: true,
    },dataVencimento: {
        type: Sequelize.STRING,
        allowNull: true,
    }, Nfaturas: {
        type: Sequelize.STRING,
        allowNull: true,
    },GerarFaturas:{
        type: Sequelize.STRING,
        allowNull: true,
    }

})


Contrato.belongsTo(User,  ); // UM Artigo pertence a uma categoria
User.hasMany(Contrato ); // UMA Categoria tem muitos artigos
// POssivel solucao para problemas futuros com alteracoes no banco 
// Contrato.sync({alter: true})
//Contrato.sync({force: true})

module.exports = Contrato;