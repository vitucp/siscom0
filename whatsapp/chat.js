const { Console } = require('console');
const venom = require('venom-bot');
const router = require('../users/UsersController');
const User =  require('../users/Users');
const { decode } = require('punycode');
const { Op } = require("sequelize");


 //venom.create().then((client) => start(client));

 function start (client) {
module.exports.verificarWhats = function (msg) { 
 

  
  console.log("teste =======>  ", msg)
 


    console.log("teste ------- 1 ")
    var whatsapp = msg.replace(/[^0-9]/g, '')
    client
    .sendText('55'+whatsapp+'@c.us', '👋 Cadastro realizado com sucesso.')
    .then((result) => {
      console.log('teste whats', whatsapp)
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
        console.log('teste whats', whatsapp)
      console.error('Error when sending: ', erro); 
    });

  

};

// RECEBER MSG

  client.onMessage( async (message) => {
  
    var identificacao = "Ola, digite sua identidade para proseguir"
    var menu = "Ola, no que podemos ajudar\n 1) meu pc nao liga"
    


      if(message.type === 'location'){

   client.onLiveLocation("558498163631@c.us", (liveLocation) => {
          console.log('teste ao vivo   =======>', liveLocation)
        });


        client.onAck(ack => {
          console.log('teste onloca====>', ack)
        });



        console.log('localização recebida', message)
        console.log("=======> ", message.lat, message.lng, message.comment, message.from )

        var whatsapp = message.from.replace(/[^0-9]/g, '')

        const parte1 = whatsapp.slice(4,8);
        const parte2 = whatsapp.slice(8, 12);
        var dd = whatsapp.slice(2, 4)
        whatsapp0 = `${parte1}-${parte2}`
        console.log('novo numero 1', whatsapp0, 'dd => ', dd)

        const parte11 = whatsapp.slice(4,9);
        const parte21 = whatsapp.slice(9,12);
        whatsapp1 = `${parte11}-${parte21}`
        console.log('novo numero 2', whatsapp1)
        

        var whatsapp0 =  `(${dd}) 9${whatsapp0}`
        var whatsapp1 =  `(${dd}) ${whatsapp1}`

        console.log('whastapp formatado =>', whatsapp1, '0 =>', whatsapp0)

     

         User.findOne({where: {[Op.or]: [
           {whatsapp: whatsapp0},
           {whatsapp:  whatsapp1}
         ]}}).then(user => {
             console.log('usuario ====>',user)
            var  id = user.id
            console.log('usuario ====>',user.id)
              User.update({
                latitude: message.lat,
                logitude: message.lng,
                
              },{
                where:{
                  id: id
                }
              })

         }).catch((erro) => {
           console.log('erro: numero de telefone nao encontrado=>',erro)
         })

      


      

      }else if(message.type === 'chat') {


 
          console.log('mgs ====> ',  message.body, ' usuario :', message.from)




    const munu = [
            
            {buttonId: 'id1', buttonText: {displayText: 'Atualizar Dados'}, type: 1},
            {buttonId: 'id2', buttonText: {displayText: 'Text of Button 2'}, type: 1},
            {buttonId: 'id3', buttonText: {displayText: 'Text of Button 3'}, type: 1}
       ]
    
    await client.sendButtons(message.from, 'Title ', munu, 'menu insterativo ').then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

        

    }else if(message.type === 'buttons_response'){
        
    console.log('teste ==============> > > > >', message.selectedButtonId)

      if(message.selectedButtonId === 'id1'){

        /*
        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
          for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        
          return text;
        }
        
        var cod = makeid()
*/
        var instrucao = 'Vamos atualizar seus dados Caso não queira responder digite x'
        var cpf = 'digite seu cpf'
        //var AtualizarDadosMilitar = `codigo: ${cod}\r\n   *Atualizar dados*\r\n *cep*\r\n *telefone:* \r\n *Rua:* \r\n *bairro:* \r\n *nº:*`;
     
        await client.sendText(message.from, instrucao )
       var cpf =  client.sendText(message.from, cpf)
        .then((result) => {
          console.log('teste whats', whatsapp)
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            console.log('teste whats', whatsapp)
          console.error('Error when sending: ', erro); //return object error
        });


        console.log('teste msg ====>', cpf)

      }

    }
  });






}





/*
  var chat = function(numero){
    venom.create().then((client) => start(client));

 
function start (client) {
    return {

      confirmarWhats: function(numero){
        console.log('teste  whats app 00 ',numero)
            var whatsapp = numero.replace(/[^0-9]/g, '')
            console.log('teste  whats app ',whatsapp)

            client
            .sendText('55'+whatsapp+'@c.us', '👋 Cadastro realizado com sucesso.')
            .then((result) => {
              console.log('teste whats', whatsapp)
              console.log('Result: ', result); //return object success
            })
            .catch((erro) => {
                console.log('teste whats', whatsapp)
              console.error('Error when sending: ', erro); //return object error
            });
          }
        

    }
  }

}








   function start (client) {
    var identificacao = "Ola, digite sua identidade para proseguir"

    
    
  
    client.onMessage((message) => {
  
      var identificacao = "Ola, digite sua identidade para proseguir"
      var menu = "Ola, no que podemos ajudar\n 1) meu pc nao liga"
  
  
  
           if(message.type === 'location'){
          console.log('localização ok ')
          console.log("=======> ", message.lat, message.lng, message.comment )
        }else if(message.type === 'chat') {

 

        client.sendText(message.from, identificacao)
          .then((result) => {
            console.log("Novo acesso", message ) 
          })
          .catch((erro) => {
            console.error('Erro ao enviar mensagem: ', erro); 
          });
      }
    });
  

  
  }

module.exports = chat;
module.exports = venom;
*/