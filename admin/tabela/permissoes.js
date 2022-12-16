const Sequelize = require("sequelize");
const connection = require("../../database/database");
const User = require('../../users/Users')

const Permissoes = connection.define('permissoes',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }, user:{
        type: Sequelize.INTEGER,
        allowNull: true,
    },admin: {
        type: Sequelize.STRING,
        allowNull: true
    },addCategoriaFaq: {
        type: Sequelize.STRING,
        allowNull: true,
    },selosCadastrados:{
        type: Sequelize.STRING,
        allowNull: true,
    }


    
})

//User.belongsTo(Permissoes,  ); // UM Artigo pertence a uma categoria
//Permissoes.hasMany(User ); // UMA Categoria tem muitos artigos

 //Permissoes.sync({alter: true})
 

module.exports = Permissoes;