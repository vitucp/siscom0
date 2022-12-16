const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require('./Users')

// EFETIVO DE MILITARES
const destino = connection.define('destino', {

    user: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },local : {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

//destino.sync({force : true})
// destino.sync({alter: true})

module.exports = destino