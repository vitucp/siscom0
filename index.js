const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// FAZER UPLOADS
const multer = require('multer')
const path = require('path')
// trabalhar com sessoes
const session = require("express-session"); 
// conecao com banco
const connection = require("./database/database");

// IMPORTAR ROTAS 
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");
const rotaMaterial = require('./routerMaterial/routerMaterial');
const rotaCautela = require('./routerMaterial/routerCautelas');
const rotaFaq = require('./faq/faq');
const admin = require('./admin/admin')
const contratos = require('./contratos/contratos')
const listaTelefonica = require('./listaTelefonica/listaTelefonica')

const cron = require('node-cron')

// tabelas 
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/Users");
const Missoes = require('./database/Missoes/Missoes')
const Destino = require('./users/Destino')
const Categoria = require('./routerMaterial/Categoria')
const  Monitor = require('./routerMaterial/Monitor')
const PlacaMae = require('./routerMaterial/tabelas/PlacaMae')
const Permissoes = require('./admin/tabela/permissoes')
const Contrato = require('./contratos/tabela/contrato')
const Faturas = require('./contratos/tabela/faturas')
const Historo = require('./users/Historico')
const Selo = require('./selo/tabela/selo')

cron.schedule("* * * * *", async () => {
   console.log("teste envio de notificação -=-=-=-=-=-=-=") 

   const sinesp = require('sinesp-nodejs')






   // notificar retorno de militares
   User.findAll().then(user => {
    user.forEach(user => {
        let date = new Date()
        let dataAtual  = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
        let retorno  = String(user.retorno) 
       // let retorno  = user.retorno

       console.log('teste =======>>>>>', dataAtual, user.nomeGuerra, retorno )
       if(dataAtual === retorno){
        console.log('alerta ok datas iguais.. 000', dataAtual, user.nomeGuerra )

       
        
        }
    });
})

});

//const venom = require('./whatsapp/chat')

/*
    var whats = '(84)99816-3631'
    function msgWhats(whats){
                          
      var whats = whatsapp.replace(/[^0-9]/g, '')
      client
      .sendText('55'+whatsapp+'@c.us', '👋 Cadastro realizado com sucesso.')
      .then((result) => {
        console.log('teste whats', whats)
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
          console.log('teste whats', whats)
        console.error('Error when sending: ', erro); //return object error
      });
    } 
*/

// verificar se usuario esta logado
const adminAuth = require('./midlewares/adminAuth')

// TRABALHAR COM DATAS 

const moment = require("moment");

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });

// UPLOAD DE ARQUIVOS...
 
const storage = multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
            cb(null, file.originalname + Date.now() + path.extname(file.originalname))
        }
})

const upload = multer({ storage })


//const upload = multer({ dest: "public/images/icones/"})

app.post('/imprimir', upload.single('file'), (req, res) => {
    res.send('arquico enviado')
})

// View engine
app.set('view engine','ejs');

// Sessions

app.use(session({
    secret: "qualquercoisa", 
    saveUninitialized: true
    //cookie: { maxAge: 400000 }
}))

// Static
app.use(express.static('public'));
// indicar static como caminho virtua, e __dirmane para absoluto
app.use('/static', express.static(__dirname + '/public'));

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(express.urlencoded({extended: true}))






// Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    })

// adicionar novas Rotas usadas 
app.use("/", categoriesController);    
app.use("/",articlesController);
app.use("/",usersController);
app.use('/', rotaMaterial);
app.use('/', rotaCautela);
app.use('/', rotaFaq);
app.use('/', admin);
app.use('/', contratos );
app.use('/', listaTelefonica)

app.get("/", (req, res) => {

    
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        //limit: 20
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories });
        });
    });


})

app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("geral/article", {article: article, categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    });
})

app.get("/category/:slug",(req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}]
    }).then( category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index",{articles: category.articles,categories: categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

const HOST = '0.0.0.0'

app.listen(8081, HOST  => {
    console.log("O servidor está rodando!")
})