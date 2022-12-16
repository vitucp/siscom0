const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../../database/database");

const Missoes = connection.define('missoes',{
    inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      
    },fim: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },

})

//Destino.belongsTo(User); // UM Artigo pertence a uma categoria

//Missoes.sync({force : true})




//Categoria.hasMany(Monitor); // UMA Categoria tem muitos artigos

//Category.hasMany(Article); // UMA Categoria tem muitos artigos

module.exports = Missoes
