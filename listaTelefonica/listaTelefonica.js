const express = require("express");
const router = express.Router();
const auth = require('../midlewares/adminAuth')

// TABELAS 
const User = require('../users/Users')


// LISTA TELEFONICA - TODOS OS CONTATOS DE MILITARES
router.get('/lista/telefonica', auth,  (req ,res ) => {
    

    User.findAll({attributes: ['id', 'graduacao', 'whatsapp', 'nomeGuerra', 'tel2']}).then(user => {
        
        res.render('listaTelefonica/listaTelefonica', {user: user})

    }).catch((ERRO) => {

        console.log('ERRO', ERRO )
    })
})

module.exports = router;