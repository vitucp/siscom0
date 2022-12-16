const Sequelize = require("sequelize");
const connection = require("../../database/database");
const CategoriaMaterial = require('../categoriaMaterial')
const Monitores = require('./MonitorTv')
const Categoria = require('../Categoria')

const PlacaMae = connection.define('placamae',{
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
    },entrada: {
        type: Sequelize.STRING,
        allowNull: true
    },preco:{
        type: Sequelize.FLOAT,
        allowNull: true
    },processador: {
        type: Sequelize.STRING,
        allowNull: true
    },tiposoquete: {
        type: Sequelize.STRING,
        allowNull: true
    },memoriaRam: {
        type: Sequelize.STRING(10,2),
        alloNull: true
    },placadevideo: {
        type: Sequelize.STRING,
        alloNull: true
    },chipset: {
        type: Sequelize.STRING,
        alloNull: true
    },NslotsMemoria: {
        type: Sequelize.STRING,
        alloNull: true
    },garantia: {
        type: Sequelize.STRING,
        alloNull: true
    },quantidade: {
        type: Sequelize.DECIMAL,
        allowNull: true         
    }, dataEntrada: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

})



//PlacaMae.sync({force: true})
 

//Category.hasMany(Article); // UMA Categoria tem muitos artigos
//Article.belongsTo(Category); // UM Artigo pertence a uma categoria



module.exports = PlacaMae;

