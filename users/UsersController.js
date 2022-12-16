const express = require("express");
const router = express.Router();
const User = require("./Users");
const Permissoes = require('../admin/tabela/permissoes')
const Destino = require('./Destino')
const bcrypt = require('bcryptjs');
const cron = require("node-cron");
const moment = require('moment')
const nodemailer = require('nodemailer');
const path = require('path')
const multer = require('multer')
const fs = require('fs');
const Selo = require('../selo/tabela/selo')


let trasporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
      user: 'stibecmb@gmail.com',
      pass: 'eppbhiunystmsfov' 
  }
})

// tabela
const Historico = require('./Historico')


// trabalhar com whatsapp
const venom = require('venom-bot');
const chat = require('../whatsapp/chat')

const jwt = require('jsonwebtoken')
const auth = require('../midlewares/adminAuth')
// Gerar token

const JWTSecret = "jsjsjsjsjsksksinsadlghcncqhcqlxdfghjgbjhgjghgfhkhgyujhgfdffdghjkkkjhgfcvbiuytgftygf"

// validação de dados

const {body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

// Teste 
const { Op, where } = require("sequelize");
const { appendFile, appendFileSync } = require("fs");
const { SocketAddress } = require("net");


// notificação

let task = cron.schedule('5/* * * * *', () =>  {
 
User.findAll().then(user => {
    user.forEach(user => {

   
        // enviar emails 
/*
        trasporter.sendMail({
            from: '7becmb <codeacessorios@gmail.com>',
            to: 'vithkj1@gmail.cm',
            subject: 'Preencha todos os dados restantes.',
            text: 'Preencha seus dados, Para uma melhor experiencia dentro da plataforma. ',
            html:   
            




        }).catch((erro) => {
            console.log('ERRO:', erro)
     })
*/

        let date = new Date()
        let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        let retorno  = String(user.retorno) 
       // let retorno  = user.retorno

       
       if(dataAtual === retorno){
        console.log('alerta ok datas iguais.. 000', user.nomeGuerra )

         user.update({
             notificacao: 'retorno',
         })
        
         let diaAtual = dataAtual.slice(0,2)
         console.log('teste dia atual', diaAtual)
      
         
        }else{}



    });
})






            }, {
                scheduled: false
            });
            
            task.start();




// home
router.get('/home', auth, async(req, res) => {
    console.log(req.session.user)
    let user = await req.session.user


    res.render('home/home', {user: user}) 
})
  
// HOME PERFIL

router.get('/perfil', auth,  (req, res) => {
    
    var {id} = req.session.user
    console.log(id);
    User.findByPk(id).then(user => {
    User.findByPk(user.ultimaAlteracaoPor).then(ultimaAlteracaoPor => {
        res.render('users/perfil', {user: user, ultimaAlteracaoPor: ultimaAlteracaoPor});

    })
})
})

// EDITAR PERFIL 

router.get("/editar/:id", auth, async (req, res) => {
    var id = req.params.id;

    //var  destino = Destino.findAll({})
    User.findByPk(id).then(user => {
        if(user != undefined){

            var moment = require('moment');
            var errors  = []
            var erros = []
            var erroSenha = []

            res.render('users/editar', { moment: moment ,erroSenha: erroSenha, user: user, errors : errors, erros: erros })

        }else{
            var erros  = []
            res.redirect('/perfil', {erros: erros})
        }
    }).catch(erro => {
        res.redirect('/perfil')
    })

})

// UPDATE PERFIL

router.post('/update/edicao', auth, [
    body('dataPartida').notEmpty().withMessage('4'),
    body('retorno').notEmpty().withMessage('5'),
], async (req, res) => {

    // Validar assinatura
    var {id} = req.session.user
    var password = req.body.password;
 

    User.findByPk(id).then(user => {

        if(user != undefined){

                var correct = bcrypt.compareSync(password, user.password);

                if(correct){
                    
                    // SALVAR dados das ALTERAÇOES 

                    var localizacao = req.body.localizacao
                    var datapartida = req.body.dataPartida
                    var retorno = req.body.retorno
 
                    console.log('teste 1 =======')
                    if(localizacao !== 'Batalhão'){
                    
                        /*
                    const erros = validationResult(req)
                    if(!erros.isEmpty()){
                        // Msg erro 
                    
                        var {id} = req.session.user
                        User.findByPk(id).then(user => {
                            res.render('users/editar', {user: user, erros: erros.array()});  
                        })
                    }
                    */

                    }else if(!datapartida && !retorno ){
                        var datapartida = null
                        var retorno = null 
                    }

                    
                    var whatsapp = req.body.whatsapp
                    
                    var tel2 = req.body.tel2
                    var nomeGuerra = req.body.nomeGuerra
                    var nome = req.body.nome
                    var graduacao = req.body.graduacao
                    var sessao = req.body.sessao
                    var email = req.body.email
                    var sexo = req.body.sexo
                    var cpf = req.body.cpf
                    var rg = req.body.rg
                    var status = ''

                    var cep = req.body.cep
                    var rua = req.body.rua 
                    var numeroCasa = req.body.numeroCasa
                    var bairro = req.body.bairro
                    var ids = req.body.ids;
                    var {id} = req.session.user

                    // cnh
                    
                    let {cnh, Ccnh, validadeCnh,modeloVeiculo, chassi, anoDeFabricacao, ipva, renavam, placa, cor,    } = req.body
                    console.log('TESTE INPUT COLOR ==>', cor, cnh, Ccnh)
            
                    if(localizacao === 'Ferias'){
                        var status = 'Ferias'
                    }else if(localizacao === 'Batalhão' && !status === 'baixado' || !status === 'punido'){
                        var status = 'Pronto'
                    }

                    console.log('numero do usuario', whatsapp)

                    // ENVIAR MENSAGEM PARA USUARIO
                    //chat.verificarWhats(whatsapp)
                
            

                    User.update({
                            email: email,
                            nomeGuerra: nomeGuerra,
                            nome: nome,
                            whatsapp : whatsapp,
                            graduacao: graduacao,
                            sessao: sessao,
                            localizacao: localizacao,
                            sexo: sexo,
                            cpf: cpf,
                            rg: rg,
                            dataPartida: datapartida,
                            retorno: retorno,
                            status: status,
                            tel2: tel2,
                            cep : cep,
                            rua : rua,
                            numeroCasa: numeroCasa,
                            bairro: bairro,
                            ultimaAlteracaoPor: id,
                            cnh: cnh,
                            Ccnh: Ccnh,
                            validadeCnh,
                            modeloVeiculo,
                            chassi,
                            anoDeFabricacao,
                            ipva,
                            renavam,
                            placa,
                            cor,



                            
                        },{
                            where: {
                                id: ids
                                 }

                        
                        }).then(() => {
                            // ENVIAR MESSAGEM VIA WHATSAPP
                            res.redirect('/perfil');

 
                            
                        }).catch((erro) => {
                            res.redirect('/update/edicao')
                            console.log(erro)
                        })

                        Destino.create({
                            user: id,
                            localizacao: localizacao,
                            retorno: retorno,
                            dataPartida: datapartida,
                        })
                        
                        



                }else{
                   
                    var id = req.body.ids
                    res.redirect("/editar/"+id); 
                }


            }else{
                res.redirect("/login"); 
            }
    })

})

// Upload Foto

router.post("/upload/foto/perfil", auth, (req, res) => {

    console.log(" \033[42;1;37m TESTE - FOTO PERFIL.  \033[0m ====> ",  )



})


//  admin
router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index",{users: users});
    });
});

                                            // HOME -  CRIAR USUARIOS.
router.get("/admin/users/create",(req, res) => {
    var erros = []
    res.render("users/create", {erros: erros});
});



                                            // SALVAR USUARIOS.
router.post("/users/create", [
    body('email').isEmail().withMessage('Email Invalido.'),
    body('password1').isLength({min: 6}).withMessage('A senha deve ter no minimo 6 caracteres.'),
    body('nomeGuerra').notEmpty().withMessage('Informe seu nome de guerra (sem a graduação)'),
    body('password2').custom((value, {req}) => {

     
      if(value != req.body.password1){
        return Promise.reject("As senhas não conferem, Tente novamente!")
      }
      return true;
    })
], async (req, res) => { 

  let {nomeGuerra, email, password1, password2} = req.body

       
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        // Msg erro 
        res.render("users/create", {erros: erros.array()})  
    }

   

        User.findOne({where:{email: email}}).then( user => {

            if(user == undefined){
                // criar hash
              // console.log('teste 01 =====> ====>>>', user)
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password1, salt);

                //console.log('teste 02 =====> ====>>>', user)


                User.create({
                    
                    nomeGuerra: nomeGuerra,
                    email: email,
                    password: hash
                }).then(() => {

              

                        // enviar email 
                        trasporter.sendMail({
                            from: '7BECMB <sti@gmail.com>',
                            to: email,
                            subject: 'Seu cadastro acaba de ser criardo com suscesso!!',
                            text: 'Preencha seus dados, Para uma melhor experiencia dentro da Sistema. ',
                            html: `
                            
                            <tbody><tr>
                            <td align="center" valign="top" style="border:1px solid #f1f3f4">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            
                            <tbody><tr>
                            <td align="center" valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tbody><tr>
                            <td align="center" valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tbody><tr>
                            <td aria-hidden="true" align="center" valign="top" style="padding:25px 0px 25px 0">
                            <a href="#m_-8079003585923529892_" style="text-decoration:none;display:inline-block"><img class="m_-8079003585923529892wid_125 CToWUd" style="display:block" src="https://7becmb.eb.mil.br/images/om/logo-om.png" width="75" border="0" alt="" title="7º Be Cmb" data-bit="iit"></a>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            
                            
                            <tr>
                            <td align="center" valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tbody><tr>
                            <td align="center" valign="top" style="padding:20px;background-color:#f1f3f4" class="m_-8079003585923529892pad_15">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td align="center" valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tbody><tr>
                            <td style="border-left:1px solid #eff1f2;border-right:1px solid #eff1f2;border-top:1px solid #f1f3f4;border-bottom:1px solid #eff1f2;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #eef0f1;border-right:1px solid #eef0f1;border-top:1px solid #f1f3f4;border-bottom:1px solid #eef0f1;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #eceeef;border-right:1px solid #eceeef;border-top:1px solid #f1f3f4;border-bottom:1px solid #eceeef;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #e9ebec;border-right:1px solid #e9ebec;border-top:1px solid #f1f3f4;border-bottom:1px solid #e9ebec;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
                            <tbody><tr>
                            <td style="border-left:1px solid #e5e7e8;border-right:1px solid #e5e7e8;border-top:1px solid #eff1f2;border-bottom:1px solid #e5e7e8;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #e0e2e3;border-right:1px solid #e0e2e3;border-top:1px solid #eefof1;border-bottom:1px solid #e0e2e3;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #dbdddd;border-right:1px solid #dbdddd;border-top:1px solid #eceeef;border-bottom:1px solid #dbdddd;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td style="border-left:1px solid #d5d7d8;border-right:1px solid #d5d7d8;border-top:1px solid #e9ebec;border-bottom:1px solid #d5d7d8;border-collapse:collapse" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody><tr>
                            <td class="m_-8079003585923529892pad_mob" style="border-collapse:collapse;padding-top:25px;padding-left:28px;padding-right:28px;padding-bottom:25px" width="100%" bgcolor="#ffffff">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                            <tbody><tr>
                            <td class="m_-8079003585923529892pad_8" align="center" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;font-size:30px;color:#3c4043;line-height:42px;padding-bottom:30px">
                                Seu Cadastro foi Criado com Sucesso !!
                            </td>
                            </tr>
                            <tr>
                            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:0px 0px 0px">
                            Olá,
                            </td>
                            </tr>
                            <tr>
                            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
                            Não Esqueça de Preencher atualizar seus dados
                            </td>
                            </tr>
                            <tr>
                            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
                            
                            </td>
                            </tr>
                            <tr>
                            <td align="center" valign="top" style="padding-top:20px;padding-bottom:20px;background-color:#ffffff">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
                            <tbody><tr><td aria-hidden="true" align="center" valign="top"><a href="https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT"><img src="https://ci3.googleusercontent.com/proxy/Zre1fAeZon4GoBOJld1BwQBOoDp_nPvbMfWpo_oz1aUl9pMZintgHpbeOa_lM19isQUdBIWybtskSbQzO011QdafXFOEgtL5DEZ2dw=s0-d-e1-ft#https://services.google.com/fh/files/emails/spacer_11.gif" width="100%" height="4" border="0" alt="" style="display:block" class="CToWUd" data-bit="iit"></a></td></tr>
                            <tr>
                            <td style="border-radius:2px;background-color:#20341e;color:#ffffff!important" align="center">
                            <a style="display:block;border-radius:3px;color:#ffffff;text-decoration:none;font-family:Google Sans,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:bold;border-top:9px solid #20341e;border-right:20px solid #20341e;border-bottom:8px solid #20341e;border-left:20px solid #20341e" href="http://10.46.196.247:8080/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT">Atualizar Meus Dados</a>
                            </td>
                            </tr>
                            <tr><td aria-hidden="true" align="center" valign="top"><a href="https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT"><img src="https://ci3.googleusercontent.com/proxy/Zre1fAeZon4GoBOJld1BwQBOoDp_nPvbMfWpo_oz1aUl9pMZintgHpbeOa_lM19isQUdBIWybtskSbQzO011QdafXFOEgtL5DEZ2dw=s0-d-e1-ft#https://services.google.com/fh/files/emails/spacer_11.gif" width="100%" height="3" border="0" alt="" style="display:block" class="CToWUd" data-bit="iit"></a></td></tr>
                            </tbody></table>
                            </td>
                            </tr>
                            <tr>
                            </tr>
                            <tr>
                            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
                            Atenciosamente,
                            </td>
                            </tr>
                            <tr>
                            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:5px 0px 15px 0px">
                            <strong>Seção de Tecnologia da Informação</strong>
                            </td>
                            </tr>
                            
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody></table>
                            </td>
                            </tr>
                            
                            </tbody></table>
                            </td>
                            </tr>
                            </tbody>

                            
                            `

                        }).then((message) => {
                            res.redirect("/home");
                        }).catch((erro) => {
                            console.log('ERRO:', erro)
                        })

                        res.redirect("/home");                              
                }).catch((err) => {
                    console.log('teste erro ', err)
                    res.redirect("/admin/users/create");
                });


            }else{
               // console.log(" \033[42;1;37m  Email já existe.  \033[0m ====> ",  )

                let erros = [ {msg:"Email já cadastrado."}]
                res.render("users/create", {erros: erros});
            }
        

        });

})




// Gerar qr code 
router.get("/qr", (req, res) => {
    res.render("geral/gerarqr");
});

// ler qr-code 
router.get("/scan", (req, res) => {
    res.render("geral/scaner");
});


// login
router.get("/login", (req, res) => {
    let erros = []
    res.render("users/login", {erros});
});


// autenticar 
router.post("/authenticate", async (req, res) => {

    let {email, password} = req.body

    User.findOne({where:{email: email}}).then(async user => {
        if(user != undefined){ // Se existe um usuário com esse e-mail
            // Validar senha
            var correct = bcrypt.compareSync(password,user.password);
            
            try{
                
                var permissoes = await Permissoes.findOne({where: {user: user.id}})
          

            
                if(correct){

                    req.session.user = {
                        id: user.id,
                        nomeGuerra: user.nomeGuerra,
                        permissoes : permissoes    
                    }

                    var {id} = req.session.user

                    User.findByPk(id).then(user => {
                        console.log(' \033[0;32m --> ', user.nomeGuerra, "esta online", "\033" )
                    })


    // Criar pastas para usuario.
    const dir = path.resolve('uploads/'+req.session.user.id+'_user/')
    if (!fs.existsSync(dir)){
        //Efetua a criação do diretório
       fs.mkdirSync(dir);
       fs.mkdirSync(path.resolve('uploads/' + req.session.user.id + '_user/documentos'));
    }else{
       let dirFaq = path.resolve('uploads/'+req.session.user.id+'_user/documentos');
       if(!fs.existsSync (dirFaq)){
        fs.mkdirSync(path.resolve('uploads/' + req.session.user.id + '_user/documentos'))
        await callback(null, path.resolve('uploads/'+req.session.user.id+'_user/documentos'));

       }
      //callback(null, path.resolve('uploads/'+req.session.user.id+'_user/documentos'));
    }
                    
                    res.redirect("/home");



                }else{
                    let erros = ["Email ou senha invalido."]
                    res.render("users/login", {erros}); 
                }

            }catch(erro){

                console.log('ERRO =>', erro)
                Permissoes.update({ 
                user: user.id,
                addCategoriaFaq: addCategoriaFaq
                })
            }
            
         
        }else{
           
            let erros = ["Email ou senha invalido."]   
            res.render("users/login", {erros}); 
        }
    }).catch(erro => {

         console.log(" \033[42;1;37m  ERRO:  \033[0m ====> ", erro  )

    })

});

router.get("/logout", (req, res) => { 
    req.session.user = undefined;
    res.redirect("/");
})


router.post("/recuperar/conta", (req, res) => {
  let email = req.body.email

  console.log(" \033[41;1;37m  TESTE  \033[0m ====>  ", email, req.body)

  User.findOne({where: {email: email}}).then(user => {

    if(user != undefined){ 

        function geraStringAleatoria(tamanho) {
            var stringAleatoria = '';
            var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < tamanho; i++) {
                stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return stringAleatoria;
        }

        let codigoDeRecuperacao =  geraStringAleatoria(10)
        User.update({
            codigoDeRecuperacao: codigoDeRecuperacao ,
        },{where:{id: user.id}})


        trasporter.sendMail({
            from: '7BECMB - Nova senha <sti@gmail.com>',
            to: user.email,
            subject: 'Recebemos seu pedido de recuperacao de conta.',
            text: '',
            html: `
            
            <tbody><tr>
            <td align="center" valign="top" style="border:1px solid #f1f3f4">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
            
            <tbody><tr>
            <td align="center" valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
            <tbody><tr>
            <td align="center" valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tbody><tr>
            <td aria-hidden="true" align="center" valign="top" style="padding:25px 0px 25px 0">
            <a href="#m_-8079003585923529892_" style="text-decoration:none;display:inline-block"><img class="m_-8079003585923529892wid_125 CToWUd" style="display:block" src="https://7becmb.eb.mil.br/images/om/logo-om.png" width="75" border="0" alt="" title="7º Be Cmb" data-bit="iit"></a>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            
            
            <tr>
            <td align="center" valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
            <tbody><tr>
            <td align="center" valign="top" style="padding:20px;background-color:#f1f3f4" class="m_-8079003585923529892pad_15">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td align="center" valign="top">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
            <tbody><tr>
            <td style="border-left:1px solid #eff1f2;border-right:1px solid #eff1f2;border-top:1px solid #f1f3f4;border-bottom:1px solid #eff1f2;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #eef0f1;border-right:1px solid #eef0f1;border-top:1px solid #f1f3f4;border-bottom:1px solid #eef0f1;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #eceeef;border-right:1px solid #eceeef;border-top:1px solid #f1f3f4;border-bottom:1px solid #eceeef;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #e9ebec;border-right:1px solid #e9ebec;border-top:1px solid #f1f3f4;border-bottom:1px solid #e9ebec;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" align="center">
            <tbody><tr>
            <td style="border-left:1px solid #e5e7e8;border-right:1px solid #e5e7e8;border-top:1px solid #eff1f2;border-bottom:1px solid #e5e7e8;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #e0e2e3;border-right:1px solid #e0e2e3;border-top:1px solid #eefof1;border-bottom:1px solid #e0e2e3;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #dbdddd;border-right:1px solid #dbdddd;border-top:1px solid #eceeef;border-bottom:1px solid #dbdddd;border-collapse:collapse;border-radius:4px" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td style="border-left:1px solid #d5d7d8;border-right:1px solid #d5d7d8;border-top:1px solid #e9ebec;border-bottom:1px solid #d5d7d8;border-collapse:collapse" align="center" bgcolor="#f1f3f4" valign="top" width="100%">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody><tr>
            <td class="m_-8079003585923529892pad_mob" style="border-collapse:collapse;padding-top:25px;padding-left:28px;padding-right:28px;padding-bottom:25px" width="100%" bgcolor="#ffffff">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            
            <tbody><tr>
            <td class="m_-8079003585923529892pad_8" align="center" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;font-size:30px;color:#3c4043;line-height:42px;padding-bottom:30px">
               Use o link abaixo para recuperar sua conta.
            </td>
            </tr>
            <tr>
            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:0px 0px 0px">
            Olá,
            </td>
            </tr>
            <tr>
            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
            Esse link so funcionara na rede do 7º Be Cmb  http://10.46.196.175:8080/recuperar/conta/${codigoDeRecuperacao}
            </td>
            </tr>
            <tr>
            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
            
            </td>
            </tr>
            <tr>
            <td align="center" valign="top" style="padding-top:20px;padding-bottom:20px;background-color:#ffffff">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
            <tbody><tr><td aria-hidden="true" align="center" valign="top"><a href="https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT"><img src="https://ci3.googleusercontent.com/proxy/Zre1fAeZon4GoBOJld1BwQBOoDp_nPvbMfWpo_oz1aUl9pMZintgHpbeOa_lM19isQUdBIWybtskSbQzO011QdafXFOEgtL5DEZ2dw=s0-d-e1-ft#https://services.google.com/fh/files/emails/spacer_11.gif" width="100%" height="4" border="0" alt="" style="display:block" class="CToWUd" data-bit="iit"></a></td></tr>
            <tr>
            <td style="border-radius:2px;background-color:#20341e;color:#ffffff!important" align="center">
            </td>
            </tr>
            <tr><td aria-hidden="true" align="center" valign="top"><a href="https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT"><img src="https://ci3.googleusercontent.com/proxy/Zre1fAeZon4GoBOJld1BwQBOoDp_nPvbMfWpo_oz1aUl9pMZintgHpbeOa_lM19isQUdBIWybtskSbQzO011QdafXFOEgtL5DEZ2dw=s0-d-e1-ft#https://services.google.com/fh/files/emails/spacer_11.gif" width="100%" height="3" border="0" alt="" style="display:block" class="CToWUd" data-bit="iit"></a></td></tr>
            </tbody></table>
            </td>
            </tr>
            <tr>
            </tr>
            <tr>
            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
            Atenciosamente,
            </td>
            </tr>
            <tr>
            <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:5px 0px 15px 0px">
            <strong>Seção de Tecnologia da Informação</strong>
            </td>
            </tr>
            
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            
            </tbody></table>
            </td>
            </tr>
            </tbody>


            
            `
        })

        
        res.redirect("/login", );

    }else{
      let erros = ["Email Não Encontrato."]
      res.render("users/login", {erros});
    }
    
  })

})


router.get("/recuperar/conta/:codigo", (req, res) => {

    let codigo = req.params.codigo;
    
    User.findOne({where:{codigoDeRecuperacao: codigo}}).then(user => {
        console.log(" \033[41;1;37m  TESTE - nova senha  \033[0m ====>  ", user)
        if(user == null){
            res.redirect('/login')
        }else{
            let erros = []
            res.render('users/alterarSenha', {erros, codigo})
        }
    })


})

router.post('/nova/senha', [
    body('password1').isLength({min: 6}).withMessage('A senha deve ter no minimo 6 caracteres.'),
    body('password2').custom((value, {req}) => {

     
        if(value != req.body.password1){
          return Promise.reject("As senhas não conferem, Tente novamente!")
        }
        return true;
      })
  ], async (req, res) => { 

           
    const erros = validationResult(req)
    if(!erros.isEmpty()){
        // Msg erro 
        res.render("users/alterarSenha", {erros: erros.array()})  
    }else{

        let {codigo, password1} = req.body
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password1, salt);

        User.update({
            password: hash
        },{where:{codigoDeRecuperacao: codigo }}).then(() => {

            res.redirect('/login')

        }).catch(erro => {
            console.log(" \033[41;1;37m  ERRO:  \033[0m ====>  ", erro)

        })


    }

  })

// CONTROLE DE PESSOAL

router.get('/controle-de-pessoal', async (req, res) => {


    user = []
    var prontos =  await  User.findAndCountAll({where: {status: "pronto"}})
    var efetivo = await User.findAndCountAll()
    var baixados = await User.findAndCountAll({where: {status: "baixado"}})
    var hgun = await User.findAndCountAll({where: {localizacao: "Hgun"}})
    var trecho = await User.findAndCountAll({where: {localizacao: "Trecho"}})
    var ferias = await User.findAndCountAll({where: {status: "Ferias"}})

    var oficiais = await User.findAndCountAll({where: {[Op.or]: [
        { graduacao: "Coronel" },
        { graduacao: "Ten Coronel" },
        { graduacao: "Major"},
        { graduacao: "Capitão"},
        { graduacao: "1º Tenente"},
        { graduacao: "2º Tenente"},
        { graduacao: "Aspirante a Oficial"},
    ]}});

    var sub = await User.findAndCountAll({where: {graduacao: 'Sub Tenente'}})

    var sgt = await User.findAndCountAll({where: {[Op.or]: [
        { graduacao: "1º Sargento" },
        { graduacao: "2º Sargento" },
        { graduacao: "3º Sargento"},
    ]}});

    var cabo = await User.findAndCountAll({where: {[Op.or]: [
        { graduacao: "Cabo" },
    ]}})

    var sd = await User.findAndCountAll({where: {[Op.or]: [
        { graduacao: "Soldado Ep" },
    ]}})

    
    var sdev = await User.findAndCountAll({where: {[Op.or]: [
        { graduacao: "Soldado Ev" },
    ]}})

    let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

    console.log('teste notificacaoRetorno: =====> >>>>>', notificacaoRetorno )

    res.render('users/controle', {notificacaoRetorno: notificacaoRetorno, sub: sub, sdev: sdev, sd: sd, cabo: cabo, sgt : sgt,oficiais: oficiais, user: user, prontos: prontos, efetivo: efetivo, baixados: baixados, hgun: hgun, trecho: trecho, ferias: ferias});
 
    
})

// EFETIVO HOME

router.get('/efetivo', auth, async (req, res) => {
    var user = await User.findAll()
    let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})
    res.render('users/controle/efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})
})

// BUSCA EFETIVO

router.post('/busca-efetivo', auth, async (req, res) => {
    var busca = req.body.busca;

    var user = await User.findAll({where: {[Op.or]: [
        {nomeGuerra: busca},
        {sessao: busca},
        {localizacao: busca},
        {graduacao: busca}
    ]}});

    res.render('users/controle/efetivo', {user: user})
})


// VER PERFIL USUARIO 

router.get('/ver-usuario/:id', auth, async (req, res) => {
    var id = req.params.id;

    var user = await User.findByPk(id)
    var erros = []
    var erroSenha = []
    res.render('users/controle/ver-usuario', {erroSenha: erroSenha ,user: user, erros: erros})
})

// SALVAR ALTERAÇOES 

router.post('/salvar-alteracao', auth, [
    body('datapartida').notEmpty().withMessage('4'),
    body('retorno').notEmpty().withMessage('5'),
], async (req, res) => {



    // Validar assinatura
    var {id} = req.session.user
    var password = req.body.password;

    User.findByPk(id).then(user => {

        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){

            var localizacao = req.body.localizacao
            var datapartida = req.body.datapartida
            var retorno = req.body.retorno


            if(localizacao !== 'Batalhão'){
                
            const erros = validationResult(req)
            if(!erros.isEmpty()){
                // Msg erro 
                var id = req.body.id
                User.findByPk(id).then(user => {
                    var erroSenha = []
                    res.render('users/controle/ver-usuario', {erroSenha: erroSenha, user: user, erros: erros.array()});  
                })
            }

            }else if(!datapartida || !retorno ){
                var datapartida = null
                var retorno = null 
            }

            var whatsapp = req.body.whatsapp
            var nomeGuerra = req.body.nomeGuerra
            var nome = req.body.nome
            var graduacao = req.body.graduacao
            var sessao = req.body.sessao
            var email = req.body.email
            var sexo = req.body.sexo
            var cpf = req.body.cpf
            var rg = req.body.rg
            var ids = req.body.id
            var status = req.body.status
            var tel2 = req.body.tel2

            var cep = req.body.cep
            var rua = req.body.rua 
            var numeroCasa = req.body.numeroCasa
            var bairro = req.body.bairro
            var {id} = req.session.user


            if(localizacao === 'Ferias'){
                var status = 'Ferias'
            }

            if(localizacao === 'Batalhão'){
                if(!status === 'punido'){
                var status = 'Pronto' 
                }
                
            }

                // criar historico



                User.update({
                    email: email,
                    nomeGuerra: nomeGuerra,
                    nome: nome,
                    whatsapp : whatsapp,
                    graduacao: graduacao,
                    sessao: sessao,
                    localizacao: localizacao,
                    sexo: sexo,
                    cpf: cpf,
                    rg: rg,
                    dataPartida: datapartida,
                    retorno: retorno,
                    status: status,
                    tel2 : tel2,
                    cep: cep,
                    rua: rua,
                    numeroCasa: numeroCasa,
                    bairro: bairro,
                    ultimaAlteracaoPor: id
                    

            
                },{
                    where: {
                        id: ids
                    }
                    
                }).then(() => {
                    res.redirect('/efetivo');
                }).catch((erro) => {
                    res.redirect('/update/edicao')
                    console.log(erro)
                })

            }else{
                var id = req.body.id
                var user =  User.findByPk(id).then(user => {

                
                    var errors  = []
                    var erros = []
                    var erroSenha = '0'
                    console.log('teste ==========================>', erroSenha)
                    res.render('users/editar', { erroSenha: erroSenha, user: user, errors : errors, erros: erros })
                    
        
                })
            }
        }

    })    
})


// RELATORIO EFETIVO 

router.get('/relatorio-efetivo/:id', async (req, res) => {
    var id = req.params.id;

    if(id === 'of'){
        var user = await User.findAll({where: {[Op.or]: [
            { graduacao: "Coronel" },
            { graduacao: "Ten Coronel" },
            { graduacao: "Major"},
            { graduacao: "Capitão"},
            { graduacao: "1º Tenente"},
            { graduacao: "2º Tenente"},
            { graduacao: "Aspirante a Oficial"},
        ]}});
        console.log('=======> ', user)

        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'sgt'){
        var user = await User.findAll({where: {[Op.or]: [
            { graduacao: "1º Sargento" },
            { graduacao: "2º Sargento" },
            { graduacao: "3º Sargento"},
        ]}});

        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})
    }else if(id === 'sub'){
        var user = await User.findAll({where: { graduacao: "Sub Tenente"}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'cb'){
        var user = await User.findAll({where: { graduacao: "Cabo" }})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})
        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno , user: user})
        
    }else if(id === 'ep'){
        var user = await User.findAll({where: { graduacao: "Soldado Ep" }})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})
        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'ev'){
        var user = await User.findAll({where: { graduacao: "Soldado Ev" }})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'total'){

       let user  = await User.findAll()  
       /*
       let user = await User.findAll({where: {[Op.or]: [
            { graduacao: "Coronel" },
            { graduacao: "Ten Coronel" },
            { graduacao: "Major"},
            { graduacao: "Capitão"},
            { graduacao: "1º Tenente"},
            { graduacao: "2º Tenente"},
            { graduacao: "Aspirante a Oficial"},
            { graduacao: "Sub Tenente"},
            { graduacao: "1º Sargento" },
            { graduacao: "2º Sargento" },
            { graduacao: "3º Sargento"},
            { graduacao: "Cabo" },
            { graduacao: "Soldado Ep" },
            { graduacao: "Soldado Ev" },
        
        ]}});
        */
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'prontos'){
        console.log('---------------------->', id)
        var user = await User.findAll({where: {status: 'pronto'}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno,user: user})

    }else if(id === 'baixado'){
        var user = await User.findAll({where: {status: 'baixado'}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno,user: user})

    }else if(id === 'hgun'){
        var user = await User.findAll({where: {localizacao: 'Hgun'}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }else if(id === 'ferias'){
        var user = await User.findAll({where: {status: 'ferias'}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno,user: user})

    }else if(id === 'trecho'){
        var user = await User.findAll({where: {localizacao: 'Trecho'}})
        let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

        res.render('users/controle/relatorio-efetivo', {notificacaoRetorno: notificacaoRetorno, user: user})

    }
    
})

// DESTINO DE MILITARES

router.get('/destinos',  async (req,res) => {
    let user = await User.findAll()
    let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})
    res.render('users/controle/destinos', {user: user, notificacaoRetorno: notificacaoRetorno })
})


// COMFIRMAR DESTINOS 
router.get('/comfirmar/retorno/:id',   async (req,res) => {

    let {id} = req.params
    User.findByPk(id).then(user => { 

    console.log('teste historico -=-=-=-==->',  user.localizacao, user.dataPartida, user.retorno,)

    Historico.create({
        user: user.id,
        retorno: user.retorno,
        dataPartida: user.dataPartida ,
        localizacao: user.localizacao,
    })
    })

    User.update({

        notificacao: 'ok',
        retorno: '',
        dataPartida: '',
        localizacao: 'Batalhão',

    }, {where: {id: id}}).then(() => {

     

      res.redirect('/destinos')
    }).catch((erro) => {
        console.log('ERRO:', erro)
    })
    
    
})

// BUSCAR DESTINOS 

router.post('/busca-destino', async (req,res) => {
    var busca = req.body.busca
    var data = req.body.data
    
    console.log('===========',data)
    var user = await User.findAll({where: {[Op.or]: [
        {nomeGuerra: busca },
        {dataPartida: busca},
        {retorno: busca},
        {status: busca},
        {localizacao: busca},
        {sessao: busca}
    ]}})
    res.render('users/controle/destinos', {user: user })
})

// historico DE DESTINOS 

router.get('/historico', async (req, res) => {

    let user = await Historico.findAll() 
    let notificacaoRetorno = await User.findAndCountAll({where: {notificacao: "retorno"}})

    res.render('users/controle/historico', {user: user, notificacaoRetorno: notificacaoRetorno  })

})

// Controle de Missoes 

router.get('/missoes', async (req, res) => {

    var trecho = await User.findAndCountAll({where: {localizacao: 'trecho'}})
    var batalhao = await User.findAndCountAll({where: {localizacao: 'batalhao'}})
    
    res.render('users/controle/relatorioMissoes', {batalhao: batalhao, trecho: trecho })

})

// Efetivo Total

router.get('/efetivo-total', async (req, res) => {

        var efetivo = await User.findAll({where: {[Op.or]: [
            { graduacao: "Coronel" },
            { graduacao: "Ten Coronel" },
            { graduacao: "Major"},
            { graduacao: "Capitão"},
            { graduacao: "1º Tenente"},
            { graduacao: "2º Tenente"},
            { graduacao: "Aspirante a Oficial"},
            { graduacao: "Sub Tenente"},
            { graduacao: "1º Sargento" },
            { graduacao: "2º Sargento" },
            { graduacao: "3º Sargento"},
            { graduacao: "Cabo" },
            { graduacao: "Soldado Ep" },
            { graduacao: "Soldado Ev" },
        ]}});
    console.log("====>>>>>>",efetivo)

    res.render('users/controle/efetivo', {efetivo: efetivo})
})

// BUSCA OFICIAIS EFETIVO TOTAL

router.get("/busca/of", async (req, res) => {

    // retorna oficiais
        var efetivo = await User.findAll({where: {[Op.or]: [
            { graduacao: "Coronel" },
            { graduacao: "Ten Coronel" },
            { graduacao: "Major"},
            { graduacao: "Capitão"},
            { graduacao: "1º Tenente"},
            { graduacao: "2º Tenente"},
            { graduacao: "Aspirante a Oficial"},

        ]}});
        console.log(efetivo)

    res.render('users/controle/efetivo', {efetivo: efetivo})

})

//  BUSCA SGT EFETIVO TOTAL

router.get("/busca/sgt", async (req, res) => {

    // retorna sgt
    var efetivo = await User.findAll({where: {[Op.or]: [
        { graduacao: "1º Sargento" },
        { graduacao: "2º Sargento" },
        { graduacao: "3º Sargento"},
    ]}});
        console.log(efetivo)
    
    res.render('users/controle/efetivo', {efetivo: efetivo})

})

//  BUSCA CABO EFETIVO TOTAL

router.get("/busca/cb", async (req, res) => {

    // retorna CABO
    var efetivo = await User.findAll({where: {[Op.or]: [
        { graduacao: "Cabo" },
    ]}})
        console.log(efetivo)
    
    res.render('users/controle/efetivo', {efetivo: efetivo})

})

//  BUSCA Soldado ep EFETIVO TOTAL

router.get("/busca/sd-ep", async (req, res) => {

    // retorna sd ep
    var efetivo = await User.findAll({where: {[Op.or]: [
        { graduacao: "Soldado Ep" },
    ]}})
        console.log(efetivo)
    
    res.render('users/controle/efetivo', {efetivo: efetivo})

})

//  BUSCA Soldado EV EFETIVO TOTAL

router.get("/busca/sd-ev", async (req, res) => {

    // retorna sd EV
    var efetivo = await User.findAll({where: {[Op.or]: [
        { graduacao: "Soldado Ev" },
    ]}})
        console.log(efetivo)
    
    res.render('users/controle/efetivo', {efetivo: efetivo})


})

// MAPA LOCALIZAÇAO DE TODOS OS MILITARES

router.get('/mapa', (req, res ) => {
   
    User.findAll({attributes: ['graduacao']}).then(user => {

            console.log('teste ===> ',user)

    res.render('users/mapa', {user: user})
    }).catch((erro) => {
        console.log('erro mapa', erro)
    })

})




// *************  ************ *******  ************************* *************** //

// GERAR SELO 

router.get('/selo', auth, (req, res) => {

    let {id} = req.session.user
    
    let {permissoes} = req.session.user
    

    Selo.findAll({where:{userId: id}}).then(async selo => {
     await User.findByPk(id).then(user => {

        console.log(" \033[41;1;37m  TESTE - selo \033[0m ====>  ", selo.cnh )

            res.render('users/gerarSelo/home', {selo: selo, user: user, permissoes: permissoes})


    }).catch(erro => {

        console.log(" \033[41;1;37m  ERRO:  \033[0m ====>  ", erro)

    })



    }).catch((erro) => {
        console.log('ERRO:', erro)
    })

})






// disponibilizar via url

router.use('/files', express.static('uploads/')); 

const upload = multer({

    storage: multer.diskStorage({
        destination: (req, file, callback ) => {
            req.session.user.id
            const fs = require('fs');

           // const dirVerificar = path.resolve('uploads/cnh/')+req.session.user.id;
           
            const dir = path.resolve('uploads/'+req.session.user.id+'_user')

            if (!fs.existsSync(dir)){
                //Efetua a criação do diretório
                fs.mkdirSync(dir);
            }else{
                callback(null, path.resolve('uploads/'+req.session.user.id+'_user'));
            }

        },
        filename: (req, file, callback) => {
            const time = new Date().getTime();
            const  {id} = req.session.user

    
            callback(null, `${file.originalname}_${time}_${id}`);
        }
    })
})

// multer salvar imagens documentos 

const  uploadDocumentos =  multer({

        storage: multer.diskStorage({
            destination: async (req, file, callback ) => {
                 let id = req.session.user.id
                const fs = require('fs');
                const dirVerificar = path.resolve('uploads/documentos/')+req.session.user.id;


               User.findByPk(id).then(user => {

                Selo.findOne()
             //   console.log('TESTE ARQUIVOS =========>>>>>>>>>>>=>>+>+>+>+>+>> >>>>> ',  user.pathDocumentos, user.id)
    
                fs.rm(path.resolve('uploads/'+req.session.user.id+'_user/documentos/'+user.pathDocumentos), { recursive:true }, (err) => {
                    if(err){
                        // File deletion failed
                        console.error("ERRO:", err.message);
                        return;
                    }
                    console.log("File deleted successfully");err
                      
                })
    
               }).catch(erro => {

                console.log('ERRO: ', erro)

               })

                const dir = path.resolve('uploads/'+req.session.user.id+'_user/')
    
                if (!fs.existsSync(dir)){

                    //Efetua a criação do diretório
                   fs.mkdirSync(dir);
                   fs.mkdirSync(path.resolve('uploads/' + req.session.user.id + '_user/documentos'));

                }else{

                   let dirFaq = path.resolve('uploads/'+req.session.user.id+'_user/documentos');

                   if(!fs.existsSync (dirFaq)){
                    fs.mkdirSync(path.resolve('uploads/' + req.session.user.id + '_user/documentos'))
                    callback(null, path.resolve('uploads/' + req.session.user.id + '_user/documentos'));
    
                   }

                  callback(null, path.resolve('uploads/'+req.session.user.id+'_user/documentos'));
                }

            
        },
        fileFilter: (req, file, cb) => {
            const allowedMines =[
                'image/jpeg',
                'image/pjpeg',
                'image/png',
                'image/gif',
            ];

            if (allowedMines.includes(file.mimetype)){
                cb(null, true);
            }else{
                cd(new Error('arquivo nao suportado.'));
            }
        },
        filename: async (req, file, callback) => {

            const  {id} = req.session.user

 
               callback(null, `${file.originalname}`);
            
            
        }
        })
    })

// multer salvar imagens documentos 





router.post('/gerar/selo', auth, uploadDocumentos.single('file'), async (req, res) => {
   
    let password = req.body.password;
    
    console.log(" \033[42;1;37m  TESTE:  \033[0m ====> ", req.body  )

            

                // SALVAR dados das ALTERAÇOES 

                var ids = req.body.ids;
                var {id} = req.session.user

                let { cnh, Ccnh, validadeCnh,modeloVeiculo, chassi, anoDeFabricacao, ipva, renavam, placa, cor, selo} = req.body
                
               console.log(" \033[42;1;37m  teste 1:  \033[0m ====> ",  req.body,   req.file  )

             


                if(req.file.filename == undefined){
                    var pathDocumentos = ""
                   }else{
                   var pathDocumentos = req.file.filename
                   }
    
     

                     Selo.findOne( {order: [
                        ['id', 'DESC'],
                        ['nSelo', 'ASC'],
                    ]},{attributes:[ "nSelo" ]}).then(selo => {



                    if(selo.nSelo === null){
                        var nSelo = 1
                    }else{
                        var  nSelo = parseInt(selo.nSelo) + 1 
                    }



                    Selo.create({
                        userId: id,
                        cnh,
                        Ccnh,
                        validadeCnh,
                        modeloVeiculo,
                        chassi,
                        anoDeFabricacao,
                        ipva,
                        renavam,
                        placa,
                        cor,
                        nSelo,
                        pathDocumentos,
                        
                    }).then(() => {

           
                           console.log(" \033[42;1;37m  teste:  \033[0m ====> ",   )

                        
                
                        res.redirect('/selo')
                
                    }).catch((erro) => {
                        console.log(" \033[42;1;37m  ERRO:  \033[0m ====> ", erro  )
                    })

                    })
            

    
})


// DELETAR - selo

// Delete 
router.post("/selo/delete/:nselo",  (req, res) => {
    var nselo = req.params.nselo;
    if(nselo != undefined){
        if(!isNaN(nselo)){
            Selo.destroy({
                where: {
                    nSelo: nselo
                }
            }).then(() => {
                res.redirect("/selo");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/selo");
        }
    }else{ // NULL
        res.redirect("/selo");
    }
});



/*
router.post('/gerar/selo0', auth, uploadDocumentos.single('file') ,[
    body('dataPartida').notEmpty().withMessage('4'),
    body('retorno').notEmpty().withMessage('5'),
], async (req, res) => {

   // console.log('teste upload =====.>>>>', req )

    // Validar assinatura
    let {id} = req.session.user
    let password = req.body.password;

    User.findByPk(id).then(user => {

        if(user != undefined){

                var correct = bcrypt.compareSync(password, user.password);

                if(correct){
                    
                    // SALVAR dados das ALTERAÇOES 

                    var ids = req.body.ids;
                    var {id} = req.session.user
                                   
                    let {arquivos, cnh, Ccnh, validadeCnh,modeloVeiculo, chassi, anoDeFabricacao, ipva, renavam, placa, cor,} = req.body

                    console.log(" \033[41;1;37m TESTE  \033[0m ====>   ", req.file)


                   if(req.file.filename == undefined){
                    var pathDocumentos = ""
                   }else{
                    var pathDocumentos = req.file.filename
                   }


           
                    User.update({
                            ultimaAlteracaoPor: id,
                            cnh: cnh,
                            Ccnh: Ccnh,
                            validadeCnh,
                            modeloVeiculo,
                            chassi,
                            anoDeFabricacao,
                            ipva,
                            renavam,
                            placa,
                            cor,
                            pathDocumentos: pathDocumentos,
                            
                        },{where: {id: id}}).then(async () => {

                           User.findAll({attributes:['nSelo', 'id']}).then(user => {
                   
                            

                            let n = 10
                 
                            User.update({
                                nSelo: id+10
                            },{where: {id: id}}).then(() => {
                                res.redirect("/selo")
                            }).catch((erro) => {
                                console.log('ERRO:', erro)
                            })
                            
            
                        })
                 
                        })

                    }else{
                   
                            var id = req.body.ids
                            res.redirect("/selo"+id); 
                        }
                    


                        }else{
                            res.redirect("/selo"); 
                        }})
                    
                    })
*/


// selos cadastrados 

router.get('/selos/cadastrados', auth, (req, res) => {


    Selo.findAll().then(async selo => {
        
        let user =  await   User.findAll({attributes: ['id', 'nomeGuerra', 'nSelo', 'cnh', 'Ccnh', 'validadeCnh', 'modeloVeiculo', 'chassi', 'anoDeFabricacao', 'ipva', 'renavam', 'placa', 'cor', 'graduacao']})
        
        res.render('users/gerarSelo/cadastrados', {selo:  selo, user : user })

        console.log('teste nSelo =====>', user )


    }).catch((erro) => {
        console.log('teste nSelo =====>', user.permissoes)
        console.log('ERRO', erro)
        res.render('/selo')
    })



})

// BUSCA SELOS


// ver dados usuario selo


router.get('/selo/:nSelo', auth, async (req, res) => {
    let nSelo = req.params.nSelo;
    let {id} = req.session.user
    let permissoes = await Permissoes.findOne({where: {user: req.session.id}})
    let user =  await User.findOne({where:{id: id}})

    let selo = await Selo.findOne({where:{nSelo: nSelo}})


        res.render('users/gerarSelo/editar',  {permissoes: permissoes, user: user, selo: selo} )

  
})


router.post('/novo/selo', auth,   uploadDocumentos.single('file'), async (req, res) => {
    let {renavam, chassi, anoDeFabricacao, modelo, ipva, placa, cor } = req.body
    let {id} = req.session.user


//console.log(" \033[41;1;37m TESTE  \033[0m ====>   ", req.body)

    if(req.file.filename == undefined){
        var pathDocumentos = ""
       }else{
        var pathDocumentos = req.file.filename
       }



    await Selo.findOne( {order: [
        ['id', 'DESC'],
        ['nSelo', 'ASC'],
    ]},{attributes:[ "nSelo" ]}).then(selo => {

        console.log(" \033[42;1;37m  TESTE 0  \033[0m ====> ", selo)

        if(selo === null){
            var nSelo = 1
        }else{
            
            var  nSelo = parseInt(selo.nSelo) + 1 
        }

    
    
    console.log(" \033[42;1;37m  TESTE 1  \033[0m ====> ", nSelo)
    
    
    Selo.create({
        userId: id,
        nSelo,
        renavam,
        chassi,
        anoDeFabricacao,
        modelo,
        ipva,
        placa,
        cor,
        pathDocumentos,
        
    }).then(() => {

        res.redirect('/selo')

    }).catch((erro) => {
        console.log(" \033[42;1;37m  ERRO:  \033[0m ====> ", erro  )
    })
    
})
})

// ATUALIZAR SELO



router.post('/atualizar/selo', auth, async (req, res) => {


    console.log(" \033[42;1;37m  TESTE - ATUALIZAÇÂO \033[0m ====> ", req.body )
   let  modeloVeiculo = req.body.modeloVeiculo
   let chassi = req.body.chassi
   let anoDeFabricacao = req.body.anoDeFabricacao
   let ipva = req.body.ipva
   let renavam = req.body.renavam
   let placa = req.body.placa
   let cor = req.body.cor
   let nSelo = req.body.nSelo
   let selo = req.body.selo
   let cnh = req.body.cnh
   let Ccnh = req.body.Ccnh
   let validade = req.body.validadeCnh
   let pathDocumentos = req.body.file


   console.log(" \033[42;1;37m TESTE ===>  \033[0m ====> ", pathDocumentos  )


    Selo.update({

        cnh: cnh,
        Ccnh: Ccnh,
        validadeCnh: validade,
        modeloVeiculo: modeloVeiculo,
        chassi: chassi,
        anoDeFabricacao: anoDeFabricacao,
        ipva: ipva,
        renavam: renavam,
        placa: placa,
        cor: cor,
        nSelo: nSelo,
        pathDocumentos: pathDocumentos,

    },{where:{nSelo: selo}}).then(() => {
            
          res.redirect('/selo')
            
        }).catch(erro => {
            console.log(" \033[42;1;37m ERRO:  \033[0m ====> ", erro  )

        })
 
    
})


router.post('/gerar/selo/:selo', auth,  uploadDocumentos.single('file'), (req, res) => {
    let selo = req.params.selo

    Selo.findOne({where: {nSelo: selo}}).then(selo => {

        console.log(" \033[42;1;37m  TESTE = Selo atualizar  \033[0m ====> ", req.body.toString()  )
        let {cnh, Ccnh, validadeCnh, cor, placa, modeloVeiculo, anoDeFabricacao, chassi, ipva,  renavam,    } = req.body

        Selo.update({

            modeloVeiculo: modeloVeiculo,
            chassi: chassi,
            anoDeFabricacao: anoDeFabricacao,
            ipva: ipva,
            renavam: renavam,
            placa: placa,
            cor: cor,
            pathDocumentos: req.file.filename,
        },{where:{nSelo: selo}}).then(() => {
            res.redirect('/selo')
        }).catch(erro => {
            console.log(" \033[42;1;37m  ERRO:  \033[0m ====> ", erro  )

        })
    })
})






router.get('/deletar/:nselo', auth, (req, res) => {

    let {id}  = req.session.user
    let nselo = req.params.nselo

    findByPk(id).then(user => {

        

    })
})



// !!!!
router.get('/atualizar/selo', (req, res) => {
    User.findAll().then(user => {
        user.forEach(user => {
            
            Selo.create({
                userId: user.id,
                cnh: user.cnh,
                Ccnh: user.Ccnh,
                validadeCnh: user.validadeCnh,
                modeloVeiculo: user.modeloVeiculo,
                chassi: user.chassi,
                anoDeFabricacao: user.anoDeFabricacao,
                ipva: user.ipva,
                renavam: user.renavam,
                placa: user.placa,
                cor: user.cor,
                nSelo: user.nSelo,
                pathDocumentos: user.pathDocumentos,


            })
        })


    }).catch((erro) => {
        console.log(" \033[42;1;37m  ERRO:atualizar selo  \033[0m ====> ", erro  )

    })

    res.redirect('/selo')
})

module.exports = router;