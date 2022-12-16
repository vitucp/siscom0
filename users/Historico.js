const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require('./Users')





const Category = require("../categories/Category");
const CategoriaMaterial = require('../routerMaterial/categoriaMaterial')
const Monitortv = require('../routerMaterial/tabelas/MonitorTv')

const Categoria = require('../routerMaterial/Categoria')
const  PlacaMae = require('../routerMaterial/tabelas/PlacaMae')

// Historico
const historico = connection.define('historico', {

    user: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },localizacao : {
        type: Sequelize.STRING,
        allowNull: true,
    },dataPartida: {
        type: Sequelize.STRING,
        allowNull: true,
    },retorno: {
        type: Sequelize.STRING,
        allowNull: true,
    }
    
})

//User.hasMany(historico, ); // UMA Categoria tem muitos artigos
//historico.belongsTo(User,); // UM Artigo pertence a uma categoria




//historico.sync({force : true})
//historico.sync({alter: true})

module.exports = historico