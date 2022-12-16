const Sequelize = require("sequelize");
const connection = require("../database/database");
const Monitor = require('../routerMaterial/tabelas/MonitorTv')

const Categoria = connection.define('categorias',{

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
    /*
    ,categoriaId:{
        type: Sequelize.INTEGER,
        references: {model: 'categoria', key: 'id'},
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'
    }
*/
})


//User.hasMany(Article);
//Category.hasMany(Article); // UMA Categoria tem muitos artigos
//Article.belongsTo(Category); // UM Artigo pertence a uma categoria

Categoria.hasMany(Monitor); // UMA Categoria tem muitos artigos
Monitor.belongsTo(Categoria); // UM Artigo pertence a uma categoria


//Categoria.sync({force : true})

module.exports = Categoria;