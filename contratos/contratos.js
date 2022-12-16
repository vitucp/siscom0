const express = require("express");
const router = express.Router();
const auth = require('../midlewares/adminAuth')
const bcrypt = require('bcryptjs');

// tabelas
const User = require('../users/Users')
const Permissoes = require('../admin/tabela/permissoes')
const Contrato = require("../contratos/tabela/contrato")
const Faturas = require('../contratos/tabela/faturas')

const nodemailer = require('nodemailer');

const { Op } = require("sequelize");
const { render } = require("ejs");
const { contextsKey } = require("express-validator/src/base");

const cron = require("node-cron");
const moment = require('moment')

// notificação

let trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'stibecmb@gmail.com',
        pass: 'eppbhiunystmsfov' 
    }
})


var task = cron.schedule('5/* * * * *', () =>  {

    /////////////// teste cnpj 
/*
    const consultarCNPJ = require('consultar-cnpj')

async function getCNPJ(){

  const empresa = await consultarCNPJ('04002498000182')
  console.log(empresa)

}

getCNPJ()

*/



    async function AlertaFaltaFatura(){

        Faturas.findAll().then(faturas => {
            faturas.forEach(faturas => {
                    
                let date = new Date();
                let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

                let mesAtual = dataAtual.slice(3, 5)
                let x = parseInt(mesAtual)

                let mesVencimeto = faturas.vencimento.slice(3,5)

                //console.log('TESTE INCLUDE 88****** * ** ** ** * * ** ** ** * ** ** *** *  **  ** * ** * * * >>>>> ',mesVencimeto)

            })   
        })
    }

    AlertaFaltaFatura()

        // ENVIAR EMAIL
        
        function enviarEmail(){

            Faturas.findAll({attributes: ['contratoId', 'notificacao']}).then(faturas => {
                faturas.forEach(faturas => {
               
                    let {contratoId, notificacao} = faturas

                })}).catch(erro => {console.log('ERRO; ', erro)})
        }   

        enviarEmail()


    console.log('====== VERIFICANDO FATURAS  ======');


    Faturas.findAll().then(faturas => {

        faturas.forEach(faturas => {

        let date = new Date();
        let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    
        
        let diaAtual = dataAtual.slice(0,2)
        let mesAtual = dataAtual.slice(3, 5)
        let anoAtual = dataAtual.slice(-4)
        let diaVencimeto = faturas.vencimento.slice(0,2)
        let mesVencimeto = faturas.vencimento.slice(3,5)
        let anoVencimeto = faturas.vencimento.slice(-4)

        let y = parseInt(mesVencimeto ) + 1
        let a = parseInt(mesVencimeto)
        let x = parseInt(mesAtual) + 1  
        
    
/*
        console.log('TESTE SOMA 01 ********** ***** * * * *** *** *  >', a , y )

        if(diaAtual === "25"){
            if( a === y){

                console.log('NAO TEM FATURA DESSE MES ********** ***** * * * *** *** *  >', mesVencimeto, faturas.nrFatura)

            }else{
                
                console.log('FATURA DO MES ATUAL NAO FOI LANÇADA ********** ***** * * * *** *** *  >',  faturas.nrFatura)
            }

        }
        
*/

        function notificacaoFatura(diaAtual, mesAtual, anoAtual, diaVencimeto, mesVencimeto, anoVencimeto){

            let dia =  diaVencimeto - diaAtual 
            let mes =  mesVencimeto - mesAtual
            let ano =  anoVencimeto - anoAtual
           
            if(!faturas.dataEntregaTesouraria ){

                // se a faturas estiver vencida.
                if(dia <= 0 && mes <= 0 && ano <= 0){
                    // notificacoes
                    // 0 = fatura vencida.
                    // 1 = Menos de 15 dias para vencimento.  
                    // 2 = Faturas vencidas. 
                    Faturas.update({

                        notificacao: '0',

                    },{where:{

                        id: faturas.id}
                    })
                // Verificar se faltam 15 dia para vencimento
                }else if(dia == 5 && mes >= 0 && ano >= 0){

                    Faturas.update({
                        notificacao: '1',

                    },{where:{id: faturas.id}}).then(() => {

                
                         // enviar email 
                    trasporter.sendMail({
                        from: '7º BE CMB <Sti@gmail.com>',
                        to: 'vithkj1@gmailom',
                        subject: 'Alerta',
                        text: '7º BE CMB',
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
                            Faltam Menos de 5 Dias Para o Vencimento da Fatura
                        </td>
                        </tr>
                        <tr>
                        <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:0px 0px 0px">
                        Olá,
                        </td>
                        </tr>
                        <tr>
                        <td align="left" valign="top" style="font-family:Google Sans,Roboto,Arial,Helvetica,sans-serif;color:#5f6368;font-size:16px;line-height:26px;padding:20px 0px 0px">
                        Enviamos Este E-mail Para Notificar que Faltam menos de 5 dias para o vencimento da fatura xxx 
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
                        <a style="display:block;border-radius:3px;color:#ffffff;text-decoration:none;font-family:Google Sans,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;font-size:16px;line-height:24px;font-weight:bold;border-top:9px solid #20341e;border-right:20px solid #20341e;border-bottom:8px solid #20341e;border-left:20px solid #20341e" href="http://10.46.196.247:8080/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://notifications.google.com/g/p/AKWoLQiItL5JqNtB7jSx3uKWi1t3cXQ61_t5gGUi7ch5C6iBYOXJ-52IwsTO13jbPCIrKnkHGLSTzXGqO3FHY-IZe4sdKvulKyWAToJhlJruu76Hbsjp4eAQgfqlrzp-CnxOsT1lDv9I-Co6QnWLJwdp53KzdzqJMBXXvXhdW6A080cKTxH-eI25bftOaIKiukaVvR2m_cxTlhaxOFEW2UoLzf0OIpPZx_PJzL5wSm7X0bL_doyUSExE2BwyY7GZUVI&amp;source=gmail&amp;ust=1666182150047000&amp;usg=AOvVaw079btfffzqaeDhmwE0WRsT">ACESSAR SISTEMA</a>
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
                    })
                }


            }else{

                Faturas.update({

                    notificacao: '',

                },{where:{id: faturas.id}})
            }

           // console.log('Funcao executada =======================> >>>>>>', "dia ===> ", dia, "mes ===> ",  mes, "ano ===> ", ano    )

          }

         notificacaoFatura(diaAtual, mesAtual, anoAtual, diaVencimeto, mesVencimeto, anoVencimeto)

        var date1 = new Date(anoVencimeto, mesVencimeto, diaVencimeto);
        var date2 = new Date(anoAtual, mesAtual, diaAtual);

        var diff = new Date(date1.getTime() - date2.getTime());

        // FATURAS VENCIDADA. 
                   
        // 0 = fatura vencida.
        // 1 = Menos de 15 dias para vencimento. 
        // 2 = Faturas vencidas. 

        let dia = diff.getUTCDate() - 1
        let mes = diff.getUTCMonth()
        let ano = diff.getUTCFullYear() - 1970
    
    
          if(!faturas.DataPreenchimento){
                // verificar se fatura esta vencida.
                if(dia <= 0 && mes <= 0 && ano <= 0 ){
                    // notificacoes
                    // 0 = fatura vencida.
                    // 1 = Menos de 15 dias para vencimento.  
                    // 2 = Faturas vencidas. 
                    Faturas.update({
                        notificacao: '0',
                    },{
                        where:{
                            id: faturas.id
                        }
                    })
                // Verificar se faltam 15 dia para vencimento
                }else if(dia == 15 && mes >= 0 && ano >= 0){

                    Faturas.update({
                        notificacao: '1',
                    },{where:{id: faturas.id}})
                }
            }else{
                Faturas.update({

                    notificacao: '',

                },{where:{id: faturas.id}})
            }
    })
})


    console.log('====== VERIFICANDO CONTRATOS ======');

    Contrato.findAll({attributes: ['id', 'notificacao', 'Ncontrato', 'dataTermino', 'dataInicio']}).then(contratos => {
        contratos.forEach(async contratos => {

            let date = new Date();
            let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
            console.log('data atual ==========>',  dataAtual);

            let anoAtual = dataAtual.slice(-4)
            let anoTermino = contratos.dataTermino.slice(-4)
            let mesAtual = dataAtual.slice(3, 5)
            let mesTermino = contratos.dataTermino.slice(3,5)
            let diaTermino = contratos.dataTermino.slice(0,2)
            let diaAtual = dataAtual.slice(0,2)
            let diaInicio = contratos.dataInicio.slice(0,2)
            let mesInicio = contratos.dataInicio.slice(3,5)
            let anoInicio = contratos.dataInicio.slice(-4)

            var date1 = new Date(anoInicio, mesInicio, diaInicio);
            var date2 = new Date(anoTermino, mesTermino, diaTermino);
            var dataTermino2 = String(date2.getDate()).padStart(2, '0') + '/' + String(date2.getMonth() ).padStart(2, '0') + '/' + date2.getFullYear(); 
            
            var diff = new Date(date2.getTime() - date1.getTime());


            //console.log('teste 90 dias ===========> ',  mesTermino, dataAtual )
/*
            if(dataTermino2 == dataAtual){
                console.log('***** fim de contrato *****  ' )
                // CONTRATOS
                // 0 = FIM DE CONTRATO

                Contrato.update({
                    notificacao: '0'
                },
                {where: {
                    id: contratos.id
                }})
                
   

            }else if(mesTermino == diff.getUTCMonth() ){

                console.log('teste 90 dias ===========> ',  dataTermino2   +" "+ "data atual ", dataAtual, )

            }
*/

        })
    })

    



  }, {
    scheduled: false
  });
  
  task.start();


//  upload

const multer = require('multer');
const path = require('path');
const { cookie } = require("express-validator");
const { ContextHandlerImpl } = require("express-validator/src/chain");
const { read, futimesSync } = require("fs");
const { Console } = require("console");



                                    // Meus contratos 

router.get('/meus/contratos', auth, (req, res) => {

    var {id, user} = req.session.user 
    console.log('TESTE CONTRATOS **** * * **** * * * * ** * * * * **>>>', id)

    
    Contrato.findAll({where: {userId: id}},{
        include: [{model: User}]
    }).then(contratos => {
        var user = req.session.user
        
       res.render('contratos/meuscontratos/meuscontratos', {contratos:contratos})
    })
})

                                    // CRIAR CONTRATOS

router.post('/salvar/contrato', auth,(req, res) => {

    var {id} = req.session.user
    var {titulo, dataInicio, dataTermino,  Ncontrato, descricao, nrFatura, valor, vencimento, dataEntragaTesouraria, nrOb, dataOb } = req.body
  
        
            let date = new Date();
            let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
           // console.log('data atual ==========>',  dataAtual, 'data notificaçao ==> ', contratos.notificacao, 'data termino', contratos.dataTermino );
            
            let anoAtual = dataAtual.slice(-4)
            let anoTermino = dataTermino.slice(-4)
            let mesAtual = dataAtual.slice(3, 5)
            let mesTermino = dataTermino.slice(3,5)
            let diaTermino = dataTermino.slice(0,2)
            let diaAtual = dataAtual.slice(0,2)
            let diaInicio = dataInicio.slice(0,2)
            let mesInicio = dataInicio.slice(3,5)
            let anoInicio = dataInicio.slice(-4)
           
            var date1 = new Date(anoInicio, mesInicio, diaInicio);
            var date2 = new Date(anoTermino, mesTermino, diaTermino);
            
            var diff = new Date(date2.getTime() - date1.getTime());

            let ano  = anoTermino - anoInicio 

     
            if(ano <= 0  ){

                var numeroDeFaturas = mesTermino - mesInicio ;

            }else if(ano >= 0){

                var  numeroDeFaturas = ano * 12

            }
          
            
            if( diff.getUTCFullYear() - 1970 == 0 && diff.getUTCMonth() == 0  ){

            
                Contrato.create({
                    titulo: titulo,
                    dataInicio,
                    descricao,
                    dataTermino,
                    status: '',
                    Ncontrato,
                    userId: id,
                    Nfaturas: numeroDeFaturas,
                    valor,
                    vencimento,
                    dataEntragaTesouraria,
                    nrOb,
                    dataOb,
                    GerarFaturas: 0,
                    notificacao: "",

                    

                }).then(() => {

                res.redirect('/meus/contratos')
                  
                }).catch((erro) => {
                    console.log('erro ==>', erro)
                    res.send('erro tente novamente mais tarde.')
                })



            }else if(diff.getFullYear() - 1970 >= 1){
                console.log('TESTE faltam ',  diff.getFullYear()- 1970, ' ano faturas', (diff.getFullYear()- 1970) * 12  )
                let Nfaturas = (diff.getFullYear()- 1970) * 12  


                Contrato.create({
                    titulo: titulo,
                    dataInicio,
                    notificacao: '',
                    descricao,
                    dataTermino,
                    status: '',
                    Ncontrato,
                    userId: id,
                    Nfaturas: Nfaturas,
                    GerarFaturas: 0,
                }).then(() => {

                    res.redirect('/meus/contratos')

                }).catch((erro) => {
                    console.log('erro ==>', erro)
                    res.send('erro tente novamente mais tarde.')
                })

            }else if(diff.getFullYear() - 1970 <=  1){
                console.log('TESTE faltam ',  diff.getUTCMonth(), ' mes, faturas', diff.getUTCMonth() )
                let Nfaturas =  diff.getUTCMonth() 

                Contrato.create({
                    titulo: titulo,
                    dataInicio,
                    notificacao: '',
                    descricao,
                    dataTermino,
                    status: '',
                    Ncontrato,
                    userId: id,
                    Nfaturas: numeroDeFaturas,
                    GerarFaturas: 0,
                }).then(() => {
                    
                    res.redirect('/meus/contratos')




                }).catch((erro) => {
                    console.log('erro ==>', erro)
                    res.send('erro tente novamente mais tarde.')
                })

            }

})

                                    // GERENCIAR CONTRATOS 

router.get('/gerenciar/contratos/:id', auth, async(req, res) => {
/*
    Faturas.findAll().then(faturas => {
        faturas.forEach(faturas => {

            let date = new Date();
            let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
          
            
            let diaAtual = dataAtual.slice(0,2)
            let mesAtual = dataAtual.slice(3, 5)
            let anoAtual = dataAtual.slice(-4)
            let diaVencimeto = faturas.vencimento.slice(0,2)
            let mesVencimeto = faturas.vencimento.slice(3,5)
            let anoVencimeto = faturas.vencimento.slice(-4)

            var date1 = new Date(anoVencimeto, mesVencimeto, diaVencimeto);
            var date2 = new Date(anoAtual, mesAtual, diaAtual);
            var diff = new Date(date1.getTime() - date2.getTime());

            let dia = diff.getUTCDate() - 1
            let mes = diff.getUTCMonth()
            let ano = diff.getUTCFullYear() - 1970

        })
    })

*/



    Faturas.findAll().then(faturas => {

        faturas.forEach(faturas => {

        let date = new Date();
        let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    
        
        let diaAtual = dataAtual.slice(0,2)
        let mesAtual = dataAtual.slice(3, 5)
        let anoAtual = dataAtual.slice(-4)
        let diaVencimeto = faturas.vencimento.slice(0,2)
        let mesVencimeto = faturas.vencimento.slice(3,5)
        let anoVencimeto = faturas.vencimento.slice(-4)

        function notificacaoFatura(diaAtual, mesAtual, anoAtual, diaVencimeto, mesVencimeto, anoVencimeto){


            let dia =  diaVencimeto - diaAtual 
            let mes =  mesVencimeto - mesAtual
            let ano =  anoVencimeto - anoAtual

            // ALERTAR FALTA NOVA FATURA
            console.log(" \033[42;1;37m TESTE NOTIFICACAO 5 \033[0m ====> ", faturas.DataPreenchimento, dataAtual )
            if(faturas.DataPreenchimento === dataAtual){

    
                console.log(" \033[41;1;37m  verde ERRO  \033[0m ====>   ")

                console.log(" \033[42;1;37m Fundo Verde \033[0m ====> ")

                Faturas.update({

                    notificacao: '5',

                },{where:{ id: faturas.id }})


            }

            if(!faturas.nrOb || !faturas.dataOb && !faturas.DataPreenchimento ){
                
         
            if(faturas.dataEntregaTesouraria && dia == 5 && mes >= 0 && ano >= 0 ){

                Faturas.update({

                    notificacao: '1',

                },{where:{

                    id: faturas.id
                }

            })}else if(dia == 5 && mes >= 0 && ano >= 0){

                Faturas.update({

                    notificacao: '4',

                },{where:{

                    id: faturas.id

            }})}


            if(!faturas.dataEntregaTesouraria && dia <= 0 && mes <= 0 && ano <= 0  &&  !faturas.DataPreenchimento){

                    // notificacoes
                    // 0 = fatura vencida.
                    // 1 = Menos de 5 dias para vencimento.  
                    // 2 = Faturas vencidas. 
                    // 3 = falta entregar fatura na tesouraria e fatura vencida.
                    // 4 = falta entregar na tesouraria e faltam 5 dias para vencimento
                    // 5 = Voce ainda nao lançou  a fatura desse mẽs.

                    Faturas.update({

                        notificacao: '3',

                    },{where:{ id: faturas.id }})
                    
            }else if(dia <= 0 && mes <= 0 && ano <= 0  &&  !faturas.DataPreenchimento ){

                    Faturas.update({
                        notificacao: '0',
                    },{where:{id: faturas.id}})}

            }else{

                    Faturas.update({

                        notificacao: '',

                    },{where:{ id: faturas.id}})
            }}



            notificacaoFatura(diaAtual, mesAtual, anoAtual, diaVencimeto, mesVencimeto, anoVencimeto)

            var date1 = new Date(anoVencimeto, mesVencimeto, diaVencimeto);
            var date2 = new Date(anoAtual, mesAtual, diaAtual);
            var diff = new Date(date1.getTime() - date2.getTime());

            let dia = diff.getUTCDate() - 1
            let mes = diff.getUTCMonth()
            let ano = diff.getUTCFullYear() - 1970

    })
})


            //  nem sei como isso ta funcionando  lskdçlaskd - refatorar aqui depois...
            var id = req.params.id
            var contratos = await Contrato.findByPk(id)
            await  Faturas.findAll({where:{contratoId: contratos.id}}).then(async faturas => {
            
            
            let fatura = await Faturas.findAll({where:{contratoId: contratos.id}})
            // NOTIFICAÇÕES
            // 0 = fatura vencida.
            // 1 = 
            // 2 = 
            let notificacao =  await  Faturas.findAndCountAll({where: {notificacao: ["1", "2", "0"] , contratoId: contratos.id}})



            let date = new Date();
            let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        
            let diaAtual = dataAtual.slice(0,2)
            let mesAtual = dataAtual.slice(3, 5)
            let anoAtual = dataAtual.slice(-4)

            let diaTermino = contratos.dataTermino.slice(0,2)
            let mesTermino = contratos.dataTermino.slice(3,5)
            let anoTermino = contratos.dataTermino.slice(-4)

            let diaInicio = contratos.dataInicio.slice(0,2)
            let mesInicio = contratos.dataInicio.slice(3,5)
            var anoInicio = contratos.dataInicio.slice(-4)

            var numeroDeFaturas = mesTermino - mesInicio  ;
    
            // numero de faturas na tabela
           let n =  await  Faturas.findAndCountAll({where: {contratoId: contratos.id}})

           
           var ano = anoTermino - anoInicio 
           
         //  console.log("TESTE GERAR FATURA numero de FATURAS ======= >>>>.", ano, numeroDeFaturas);      

    if(contratos.GerarFaturas == 0){
         if(ano == 0){

             for (var i = 0; i < numeroDeFaturas + 1; i++) {
                     
                var mesatual = parseInt(mesInicio) + i
    
                let DataPreenchimento = "09/"+mesatual+"/"+anoInicio
    
                //console.log("TESTE GERAR FATURA ======= >>>>.", mesatual , numeroDeFaturas, contratos.GerarFaturas);
    
                 Faturas.create({
                    nrFatura: "",
                    valor: "", 
                    vencimento: "",
                    dataEntregaTesouraria: "",
                    nrOb: "",
                    dataOb: "",
                    contratoId: contratos.id,
                    notificacao: "",
                    DataPreenchimento: DataPreenchimento,
                
                   }).then(() => {    
    
                         Contrato.update({

                           GerarFaturas: 1,

                         },{where: {
                            
                             id: contratos.id

                         }})}).catch(erro => {console.log('ERRO:', erro)})  
                    
                }
                
            }else{


                var date1 = new Date(anoTermino, mesTermino, diaTermino);
                var date2 = new Date(anoInicio, mesInicio, diaInicio);
        
                var diff = new Date(date1.getTime() - date2.getTime());

                let dia = diff.getUTCDate() - 1
                let mes = diff.getUTCMonth()
                let ano = diff.getUTCFullYear() - 1970


                console.log("TESTE +++++ ** %% @@ !!  ======= >>>>.", dia, mes, ano);

                                     
               // var mesatual = parseInt(mesInicio) + i  
               // let DataPreenchimento = "05/"+mesatual+"/"+anoInicio
               
                   
                    var a = parseInt(anoInicio) + 1
                
         
                if(ano === 0){
            
                    for (var i = 0; i < mes + 1  ; i++) {

                                  
                    var mesatual = parseInt(mesInicio) + i
       
                    if(mesatual > 12){
                        //console.log("TESTE +++++ ** *&*& MAIOR QUE 12 %% @@ !!  ======= >>>>.", mesatual);
                        
                        var mesatual = mesatual - 12 
                        var anoInicio = a
                      //  var anoInicio = parseInt(anoInicio) + 1



                    }else{
                        
                    }
                    
                    let DataPreenchimento = "09/"+mesatual+"/"+anoInicio
                    console.log("TESTE +++++ ** MES %% @@ !!  ======= >>>>.", DataPreenchimento, i);

                    Faturas.create({
                        nrFatura: "",
                        valor: "", 
                        vencimento: "",
                        dataEntregaTesouraria: "",
                        nrOb: "",
                        dataOb: "",
                        contratoId: contratos.id,
                        notificacao: "",
                        DataPreenchimento: DataPreenchimento,
                
                   }).then(() => { 
                         //res.redirect('/gerenciar/contratos/'+contratos.id)
    
    
                         Contrato.update({
                           GerarFaturas: 1,
                         },
                         {where: {
                             id: contratos.id
                         }})}).catch(erro => {
                     console.log('ERRO:', erro)
             
                    })  


                    }

                }else{

                    var a = ano *12 + parseInt(mes)

                    var b = parseInt(anoInicio) + 1

                    for (var i = 0; i < a + 1; i++) {

                        var mesatual = parseInt(mesInicio) + i

                        if(mesatual > 12){
                            
                            var mesatual = mesatual - 12 
                            var anoInicio = b
                        }
                        
                        let DataPreenchimento = "09/"+mesatual+"/"+anoInicio

                        Faturas.create({
                            nrFatura: "",
                            valor: "", 
                            vencimento: "",
                            dataEntregaTesouraria: "",
                            nrOb: "",
                            dataOb: "",
                            contratoId: contratos.id,
                            notificacao: "",
                            DataPreenchimento: DataPreenchimento,
                    
                        }).then(() => { 
        
                             Contrato.update({GerarFaturas: 1},{where: {id: contratos.id}})}).catch(erro => {console.log('ERRO:', erro)})  
                        }

                }      
            }}
            
                res.render('contratos/meuscontratos/gerenciarContratos', {faturas: faturas, contratos: contratos, fatura: fatura, notificacao: notificacao} )

        })
})


                                    // atualizar contrato 

router.post('/atualizar/contrato', auth, (req, res)  => {

        var user = req.session.user

        // Validar assinatura
        console.log( 'teste =====>>>', user.id)
        User.findByPk(user.id).then(user => {
            if(user != undefined){
                var password = req.body.password;
                var correct = bcrypt.compareSync(password, user.password);

            if(correct){

            let  { idContrato, titulo, Ncontrato, dataInicio, descricao, dataTermino, notificacao, status, empresa,  telefoneEmpresa, emailEmpresa, cnpj, NrFatura, valor, vencimento, dataEntragaTesouraria, NrOb, DataOb } = req.body

            let mesTermino = dataTermino.slice(3,5)
            let mesInicio = dataInicio.slice(3,5)

            let anoTermino = dataTermino.slice(-4)
            let anoInicio = dataInicio.slice(-4)

            let ano  = anoTermino - anoInicio 
            
            if(ano <= 0  ){

                var numeroDeFaturas = mesTermino - mesInicio ;

            }else if(ano >= 0){

                var x = ano * 12;
                var y =  mesTermino - mesInicio;
                var  numeroDeFaturas = x + y ; 

            }
          
             
            if(NrFatura !== null || valor !== null || vencimento !== null || dataEntragaTesouraria !== null || NrOb !== null || DataOb !== null || idContrato !== null ){
                        
            Contrato.update({
                titulo,
                Ncontrato,
                dataInicio,
                descricao, 
                dataTermino, 
                notificacao: "", 
                status,
                empresa,
                cnpj,
                telefoneEmpresa,
                emailEmpresa,
                Nfaturas: numeroDeFaturas,

            },{
                where: {
                    id: idContrato 
                }
            }).then(() => {
                
                res.redirect('/meus/contratos')
            }).catch((erro) => {
                res.send('erro ao salvar')
                console.log('ERRO: ', erro )
            })

            }else{
                Faturas.create({
                    nrFatura: NrFatura,
                    valor, 
                    vencimento,
                    dataEntregaTesouraria: dataEntragaTesouraria,
                    nrOb: NrOb,
                    dataOb: DataOb,
                    contratoId: idContrato
                   }).catch(erro => {
                    console.log('ERRO:', erro)
    
                   })
            }

            }else{
                res.send('senha incorreta')
            }
            }else{
                res.send('erro')
            }
        })
})



                        // Nova Fatura
router.post('/nova/fatura', auth, (req, res) => {

   let {NrFatura, NrOb, vencimento, dataEntragaTesouraria, DataOb, valor, idContratoFaturas, idContrato}  = req.body

    // retornar data atual 
    let date = new Date();
    let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    console.log('data atual ==========>', dataAtual , 'vencimento ===> ',  vencimento )

    /*
    Contratos.findByPk(idContrato).then(contrato => {
        
        var nFaturas =  contrato.findAndCountAll({attributes: ['Nfaturas']})

    })
    */

    if(dataAtual === dataEntragaTesouraria){
        if(dataEntragaTesouraria === '' || DataOb === ''){
            
            var notificacao = '1'
        }
    }else{
            var notificacao = ''
    }
   
    let mesVencimeto = vencimento.slice(3,5)
    let anoVencimeto = vencimento.slice(-4)

    let DataPreenchimento =  "09/"+mesVencimeto+"/"+anoVencimeto

    

    Faturas.update({
        nrFatura: NrFatura,
        valor, 
        vencimento,
        dataEntregaTesouraria: dataEntragaTesouraria,
        nrOb: NrOb,
        dataOb: DataOb,
        contratoId: idContrato,
        notificacao: '',
        proximaFatura: '',
        DataPreenchimento: "",
       },{where:{DataPreenchimento: DataPreenchimento }}).then(() => { 
            res.redirect('/gerenciar/contratos/'+idContrato)
       }).catch(erro => {
        console.log(" \033[41;1;37m  ERRO  \033[0m ====>  ", erro)

       })
})


                        //  EDITAR FATURA 
router.post('/editar/fatura', auth , (req, res) => {

    let {idFatura, NrFatura, NrOb, vencimento, dataEntragaTesouraria, DataOb, valor, idContrato } = req.body

   // console.log('teste ============== ===============>> ', idFatura, NrFatura, NrOb, vencimento, dataEntragaTesouraria, DataOb, valor, idContrato )

    Faturas.update({
        nrFatura: NrFatura,
        valor, 
        vencimento,
        dataEntregaTesouraria: dataEntragaTesouraria,
        nrOb: NrOb,
        dataOb: DataOb,
        proximaFatura: '',
      //  contratoId: idContrato,
        //notificacao,
       },{
        where:{
            id: idFatura
        }
       }).then(() => { 
           res.redirect('/gerenciar/contratos/'+idContrato)
       }).catch(erro => {
        console.log('ERRO:', erro)

       })


})

                                    // APAGAR FATURA 

router.get('/apagar/fatura/:id/:fid', auth, (req, res) => {
    // Fatura Id 
    var {fid, id} = req.params
    // id user 
   // var  {id } = req.session.user

    Faturas.destroy({
        where:{
            id: fid
        }
    }).then(() => {
        res.redirect('/gerenciar/contratos/'+id)
    }).catch(erro => {
        console.log('ERRO: ', erro)
    })


})

                                // Fiscal de contrato

router.get('/fiscal/contrato', auth, async (req, res) => {

             // notificacoes
                    // 0 = fatura vencida.
                    // 1 = Menos de 5 dias para vencimento.  
                    // 2 = Faturas vencidas. 
                    // 3 = falta entregar fatura na tesouraria e fatura vencida.
                    // 4 = falta entregar na tesouraria e faltam 5 dias para vencimento
                    // 5 = Voce ainda nao lançou  a fatura desse mẽs.

   let  faturasVencimento = await Faturas.findAndCountAll({where:{ notificacao: "0"}})
   let  cincoDiasVencimento = await Faturas.findAndCountAll({where:{ notificacao: ["1", "4"]}})
   let  aguardandoEntregaTesouraria = await Faturas.findAndCountAll({where: {notificacao: ['3', '4']}})

  // console.log(" \033[41;1;37m  fiscal Contrato  \033[0m ====>   ", notificacao)


   res.render('contratos/gerenciarContratos/gerenciarContratos', {faturasVencimento, cincoDiasVencimento, aguardandoEntregaTesouraria})


})



module.exports = router;