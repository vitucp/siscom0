const Sequelize = require("sequelize");
const connection = require("../../database/database");
const CategoriaMaterial = require('../categoriaMaterial')
const Categoria = require('../Categoria')

const Teclado = connection.define('teclado',{
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
    },preco:{
        type: Sequelize.FLOAT,
        allowNull: true
    },quantidade: {
        type: Sequelize.DECIMAL,
        allowNull: true         
    },cor: {
        type: Sequelize.STRING,
        alloNull: true
    }
})

//Teclado.sync({force: true})

//Category.hasMany(Article); // UMA Categoria tem muitos artigos
//Article.belongsTo(Category); // UM Artigo pertence a uma categoria

module.exports = Teclado; 