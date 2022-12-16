const { STRING } = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Destino = require('./Destino')
const Historico = require('./Historico')
const Permissoes = require('../admin/tabela/permissoes')

const User = connection.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeGuerra: {
        type: Sequelize.STRING,
        allowNull: false
    },nome:{
        type: Sequelize.STRING,
        allowNull: true
    },graduacao:{
        type: Sequelize.STRING,
        allowNull: true
    },sessao:{
        type: Sequelize.STRING,
        allowNull: true
    },email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false                 
    },whatsapp:{
        type: Sequelize.STRING,
        allowNull: true 
    },tel2: {
        type: Sequelize.STRING,
        allowNull: true 
    },cpf: {
        type: Sequelize.STRING,
        allowNull: true 
    },rg: {
        type: Sequelize.STRING,
        allowNull: true 
    },cep: {
        type: Sequelize.STRING,
        allowNull: true 
    },rua: {
        type: Sequelize.STRING,
        allowNull: true 
    },numeroCasa:{
        type: Sequelize.STRING,
        allowNull: true 
    },bairro:{
        type: Sequelize.STRING,
        allowNull: true 
    },localizacao: {
        type: Sequelize.STRING,
        allowNull: true 
    },dataPartida: {
        type: Sequelize.STRING,
        allowNull: true,
    },retorno: {
        type: Sequelize.STRING,
        allowNull: true,
    },sexo: {
        type: Sequelize.STRING,
        allowNull: true
    },status: {
        type: Sequelize.STRING,
        allowNull: true
    },ultimaAlteracaoPor:{
        type: Sequelize.INTEGER,
        allowNull: true
    },dataUltimaAlteracao:{
        type: Sequelize.STRING,
        allowNull: true
    },funcao: {
        type: Sequelize.STRING,
        allowNull: true
    },logitude: {
        type: Sequelize.FLOAT,
        allowNull: true  
    },latitude: {
      type: Sequelize.FLOAT,
      allowNull: true
    }, permissao: {
        type: Sequelize.STRING,
        allowNull: true
    },notificacao: {
        type: Sequelize.STRING,
        allowNull: true,
    },cnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },Ccnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },validadeCnh:{
        type: Sequelize.STRING,
        allowNull: true 
    },modeloVeiculo:{
        type: Sequelize.STRING,
        allowNull: true 
    },chassi:{
        type: Sequelize.STRING,
        allowNull: true 
    },anoDeFabricacao:{
        type: Sequelize.STRING,
        allowNull: true 
    },ipva:{
        type: Sequelize.STRING,
        allowNull: true  
    },renavam:{
        type: Sequelize.STRING,
        allowNull: true 
    },placa:{
        type: Sequelize.STRING,
        allowNull: true 
    },cor:{
        type: Sequelize.STRING,
        allowNull: true 
    },nSelo:{
        type: Sequelize.STRING,
        allowNull: true 
    },pathDocumentos:{
        type: Sequelize.STRING,
        allowNull: true
    },codigoDeRecuperacao:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

//User.belongsTo(Permissoes ); // UM Artigo pertence a uma categoria
//Permissoes.hasMany(User,  ); // UMA Categoria tem muitos artigos

//User.belongsTo(Historico  ); // UM Artigo pertence a uma categoria
//Historico.hasMany(User ); // UMA Categoria tem muitos artigos


//User.belongsTo(Permissoes, { foreingKey: 'id', }); // UM Artigo pertence a uma categoria
//User.sync({force : true})

//Categoria.hasMany(Monitor); // UMA Categoria tem muitos artigos

//Category.hasMany(Article); // UMA Categoria tem muitos artigos

//User.sync({alter: true})

module.exports = User
