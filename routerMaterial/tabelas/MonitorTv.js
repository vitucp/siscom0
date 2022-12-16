const Sequelize = require("sequelize");
const connection = require("../../database/database");
const CategoriaMaterial = require('../categoriaMaterial')


const Monitortv = connection.define('monitores',{
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
})


// Monitortv.sync({force: true})


//Contrato.belongsTo(User,  ); // UM Artigo pertence a uma categoria
//User.hasMany(Contrato ); // UMA Categoria tem muitos artigos
//Category.hasMany(Article); // UMA Categoria tem muitos artigos
//Article.belongsTo(Category); // UM Artigo pertence a uma categoria

 

module.exports = Monitortv;

