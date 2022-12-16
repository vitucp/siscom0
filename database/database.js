const Sequelize = require('sequelize');

// objeto de coneção
const connection = new Sequelize('siscom','root','123456', {
    host: 'localhost', 
    dialect: 'mysql',
    timezone: '-03:00',

});

module.exports = connection;