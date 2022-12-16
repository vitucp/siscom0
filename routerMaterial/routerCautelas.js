

const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

// IMPORTAR TABELAS 

const User = require('../users/Users')

// HOME CAUTELA 

router.get('/cautela', (req, res) => {
    var user = []
    res.render('material/cautela/cautela', {user: user})
})



// BUSCA MILITAR 

router.post('/busca-militar',  async (req, res) => {
    var busca = req.body.busca;
    console.log('teste ====> ', busca)

    var user = await User.findAll({where: {[Op.or]: [
        {nomeGuerra: busca},
        {sessao: busca},
        {localizacao: busca},
        {graduacao: busca}
    ]}});

    res.render('material/cautela/cautela', {user: user})
})








module.exports = router