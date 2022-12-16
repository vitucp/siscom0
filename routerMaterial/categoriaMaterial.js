const Sequelize = require("sequelize");
const connection = require("../database/database");
const Monitortv = require("./tabelas/MonitorTv");


const CategoriaMaterial = connection.define('categorias',{

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: true
    }
})


//CategoriaMaterial.hasMany(Monitortv); // UMA Categoria tem muitos itens
//Monitortv.belongsTo(CategoriaMaterial); // UM item pertence a uma categoria

//CategoriaMaterial.sync({force: true})


// para trabalhar com qunatidades http://byteseveryday.blogspot.com/2017/06/nodejs-javascript-como-utilizar-o.html


module.exports = CategoriaMaterial;
