/*
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const session = require('express-session')



// IMPORTAR ROTAS
const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const UsersController = require('./users/UsersController');

// Importar model para sincronização.
const Users = require('./users/Users');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
//VIEW ENGINE 
app.set('view engine','ejs');


// Configura uso de sessoes.
// salva as sessoes na memoria ram.
// redis = para salvar cash
app.use(session({
    secret: 'batapericardio8p8c',
    cookie: { maxAge: 3000000 } // forma com que o cookie vai ser salvo 
}))

//static 
app.use(express.static('public'));

// indicar static como caminho virtua, e __dirmane para absoluto
app.use('/static', express.static(__dirname + '/public'));


// body parser 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// DATABASE

connection
    .authenticate()
    .then(() => {
        console.log('conexão com banco de dados ok...');
    }).catch((error) => {
        console.log(error);
    })

// rotas 
app.use('/', categoriesController);
app.use('/', articlesController);
app.use('/', UsersController);




// Rota Home
app.get("/home",(req, res) => {
    res.render("home/home");
})


app.listen(8081, () => {
    console.log('trabalhando...');
})



*/