const express = require("express");
const router = express.Router();
const auth = require('../midlewares/adminAuth')
// tabelas
const User = require('../users/Users')
const Permissoes = require('../admin/tabela/permissoes')

const { Op } = require("sequelize");




/* 
   Definição de usuarios
   # Admin => permisao total pra tudo ( full )
   # moderador => permisoes para determinadas sessoes da aplicaçao ( administrar determinadas sessoes da aplicação podendo criar, excluir, remover, editar)
   # normal => permiossoa nivel usuario comun ( visualizar de areas de interesse, criar e editar se pertinente  )

*/

/*
 HOME
 
 # exibir usuarios logados
 # exibir todos os usuarios

*/

router.get('/admin', auth, (req, res) => {
    User.findAll().then(user => {
       
       res.render('admin/home', {user: user }) 
    }).catch(erro => {
        console.log('erro =>', erro)
    })
    
})

// BUSCA USUARIOS

router.post('/busca-usuario', async (req, res) => {
    var busca = req.body.busca;
    if(busca === ''){
        res.redirect('/admin')
    }else{

    var user = await User.findAll({where: {[Op.or]: [
        {nomeGuerra: busca},
        {sessao: busca},
        {graduacao: busca}
    ]}});

    console.log('teste busca ===> ', user)
    res.render('admin/home', {user : user})
    }
}) 


// home==> para Definir permissões do usuarios 

router.get('/permissoes/:id', async (req, res) => {
    var id = req.params.id;
    var permissoes = await Permissoes.findOne({where: {user: id}})


    User.findByPk(id).then(user => {
       
        
   
        res.render('admin/permissoes/permissoes', {user: user, permissoes: permissoes})
    }).catch(erro => {
        console.log('erro ==>', erro)
    })
    
})

// Salvar permissoes do usuario

router.post("/salvar/permissoes", async (req, res) => {

    
    let {id, admin, addCategoriaFaq, selosCadastrados } = req.body
    
    console.log('teste =========>', admin, addCategoriaFaq)
    if(addCategoriaFaq == undefined ){
        addCategoriaFaq = 'nao'
    }
    if(admin == undefined ){
        admin = 'nao'
    }
    if(selosCadastrados == undefined ){
        selosCadastrados = 'nao'
    }


    
    //var permisoes = await Permissoes.findAll()
    var user = await User.findByPk(id)
        
    console.log('retorna usuario ==========>', user)

    if(!user){
        res.send('usuario nao existe ')
    }

    var permissoes = await Permissoes.findOne({where: {user: user.id}})
    
    
    try{
        if(permissoes.user == id){
            var user = permissoes.user
            Permissoes.update({
                user: user.id,
                admin: admin,
                addCategoriaFaq: addCategoriaFaq,
                selosCadastrados: selosCadastrados,

            },{where: { user : user}}).then(async () => {
                
                res.redirect('/admin')
            }).catch((erro) => {
                console.log('ERRO =>', erro)
            })
 

        }else{
            console.log('nao tem usuario na tabela ====')
        }
    }catch(erro) {
        console.log("ERRO =>", erro)


        Permissoes.create({
            user: user.id,
            admin: admin,
            addCategoriaFaq: addCategoriaFaq,
            selosCadastrados: selosCadastrados,
        }).then(

            res.redirect('/admin')    
        ).catch(erro => {
            console.log('erro =>', erro)
        })

    }

})

// deletar Usuario

router.post("/permissoes/:id",  (req, res) => {
    var id = req.params.id;

    console.log('deletar ====>', id)
    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/admin')
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else{ // NULL
        res.redirect("/admin/articles");
    }
});

// 

module.exports = router;