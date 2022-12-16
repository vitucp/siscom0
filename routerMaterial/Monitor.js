const Sequelize = require("sequelize");
const connection = require("../database/database");
const Categoria = require('./Categoria');


const Monitor = connection.define('monitores',{
    marca:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },modelo: {                
        type: Sequelize.STRING,
        allowNull: true
    },tamanhoTela: {
        type: Sequelize.STRING,
        allowNull: true
    },voltagem:{
        type: Sequelize.STRING,
        allowNull: true
    },entrada: {
        type: Sequelize.STRING,
        allowNull: true
    },quantidade: {
        type: Sequelize.DECIMAL,   
        allowNull: true
    },preco: {
        type: Sequelize.DECIMAL(10,2),
        alloNull: true
    },resolucao: {
        type: Sequelize.STRING,
        alloNull: true
    },smart: {
        type: Sequelize.STRING,
        alloNull: true
    },wifi: {
        type: Sequelize.STRING,
        alloNull: true
    },bluetooth: {
        type: Sequelize.STRING,
        alloNull: true
    },garantia: {
        type: Sequelize.STRING,
        alloNull: true
    }
});



//Monitor.belongsTo(Categoria); // UM Artigo pertence a uma categoria
//Categoria.hasMany(Monitor); // UMA Categoria tem muitos artigos


//Monitor.belongsTo(Categoria); // UM Artigo pertence a uma categoria
//Monitor.hasMany(Categoria); // UMA Categoria tem muitos artigos


//Monitor.sync({force : true})

module.exports = Monitor;