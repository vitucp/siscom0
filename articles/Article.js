const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");
const CategoriaMaterial = require('../routerMaterial/categoriaMaterial')
const Monitortv = require('../routerMaterial/tabelas/MonitorTv')
const User = require('../users/Users')
const Categoria = require('../routerMaterial/Categoria')
const  PlacaMae = require('../routerMaterial/tabelas/PlacaMae')

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },autor: {
        type: Sequelize.STRING,
        allowNull: true
    },nomeArquivo: {
        type: Sequelize.STRING,
        allowNull: false
    },tamanho:{
        type: Sequelize.INTEGER,
        allowNull: false
    },tituloVideo:{
        type: Sequelize.STRING,
        allowNull:false
    },nomeArquivoDownload:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


Categoria.hasMany(PlacaMae); // UMA Categoria tem muitos artigos
PlacaMae.belongsTo(Categoria);
//Categoria.hasMany(Monitor); // UMA Categoria tem muitos artigos

Category.hasMany(Article, ); // UMA Categoria tem muitos artigos
Article.belongsTo(Category, { onDelete: 'cascade' } ); // UM Artigo pertence a uma categoria

//Article.sync({alter : true})

module.exports = Article;