const express = require("express");
const router = express.Router();

const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const CategoriaMaterial = require('./categoriaMaterial');


// TABELAS 
const PlacaMae = require("./tabelas/PlacaMae")
const Monitor = require("./Monitor");
const Teclado = require("./tabelas/teclado");
const Categorias = require('./Categoria')


const adminAuth = require('../midlewares/adminAuth')

// validação de dados

const {body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');


// HOME MATERIAL

router.get('/material', async (req, res) => {

    var totalMonitores = await  Monitor.sum('quantidade')
    var totalPlacaMae = await PlacaMae.sum('quantidade' )
    let totalTeclado = await Teclado.sum('quantidade', )

    let data = await PlacaMae.findAll({attributes: ['dataEntrada']})
    
    var monitor = await Monitor.findAll()
    
    console.log('teste monitor ------+++++++++>', monitor)
    res.render('material/index', {monitor: monitor, data:data, totalPlacaMae: totalPlacaMae, totalMonitores: totalMonitores, totalTeclado: totalTeclado})
})

// ADICIONAR ITEM

router.get('/selecionar-item', (req, res) => {
    
    CategoriaMaterial.findAll().then(categoria => {
    
        res.render('material/selectCategoria', {categoria: categoria})
    }).catch(erro => {
        console.log(erro)
        res.redirect('/material')
    })
})


// SELECIONAR ITEM

router.post('/adicionar-item', (req, res) => {
    var {categoria} =  req.body
    console.log('teste o ====>>>', categoria)

    if(categoria === 'Monitor'){
        erros = []
        
        res.render('material/formularios/Monitor', {erros: erros})
    }else if(categoria === 'Placa Mãe'){
        erros = []
        res.render('material/formularios/Placa-Mae')
    }else if(categoria === 'Teclado'){
        erros = []
        res.render('material/formularios/teclado', {erros: erros})
    }
})

// SALVAR  ITEM

router.post('/salvar-item', (req, res) => {

    
            var categoria = req.body.categoria
            console.log('valor da categoria ====>', categoria)

            if(categoria === 'Placa Mãe'){
                var {marca, modelo, entrada, preco, processador,
                    tiposoquete, memoriaRam, placadevideo,
                    chipset, NslotsMemoria, quantidade } = req.body

                    var preco = preco.replace(/[^0-9]/g, '')      

                    console.log('teste =========> preco', preco)

                PlacaMae.create({
                    marca, 
                    modelo, 
                    entrada, 
                    preco, 
                    processador,
                    tiposoquete, 
                    memoriaRam, 
                    placadevideo,
                    chipset, 
                    NslotsMemoria,
                    quantidade,
                    slug: slugify(marca),
                    IdCategoria: '1'
                    
                }).then(() => {
                    res.redirect('/selecionar-item' )
                })
            
            }else if(categoria === 'Monitor'){

                var {
                    marca, modelo, tamanhoTela, voltagem,
                    entrada, quantidade,  preco, resolucao,
                    smart, wifi, bluetooth, garantia, 
                    } = req.body

                    var preco = preco.replace(/[^0-9]/g, '') 

            Monitor.create({
                marca,
                modelo, 
                tamanhoTela, 
                voltagem,
                entrada, 
                quantidade,  
                preco, 
                resolucao,
                smart, 
                wifi, 
                bluetooth, 
                garantia,
                slug: slugify(marca)
            }).then(async()  => {
                
                res.redirect('/selecionar-item' )
            }).catch((erro) => {
                console.log(erro)
                erros = []
                res.render('material/formularios/Monitor', {erros: erros})
            })

        }else if(categoria === 'Teclado'){
            var {marca,  modelo, entrada, preco, garantia, quantidade, cor} = req.body

            var preco = preco.replace(/[^0-9]/g, '') 

            console.log('formulario de teclado  =====>>>>>>', marca, modelo, entrada, preco, quantidade, cor)

            Teclado.create({
                marca,
                modelo,
                entrada,
                preco,
                garantia,
                quantidade,
                cor,
                slug: slugify(marca)
            }).then(async () => {
                erros = []
                res.render('material/formularios/teclado', {erros: erros})
            }).catch((erro) => {
                console.log(erro)
                erros = []
                res.render('material/formularios/Monitor', {erros: erros})
            })
        }
});


// VER ITEM 


router.get('/ver/:item', async (req, res) => {

})


/*
router.get('/ver-item/:categoria', async (req, res) => {
    var categoria = req.params.categoria;

    /*
    console.log('Testando relacionamentos ===========>>>>>>>>>>>>>')
    teste = await  Categorias.findByPk(1, {include: PlacaMae})
    console.log('teste ++++++++====>>>>>>', teste)
    /

    CategoriaMaterial.findOne({where: {nome: categoria}}).then(Categoria => {

        if(categoria === Categoria.nome){


            console.log('teste ===> ', Categoria)

            var  teste = Teclado.findAll()
            res.render('material/ver-item', {teste: teste})

  

        }else{
            console.log("categoria ====>", categoria, 'nome ==> ', nomeCategoria.nome)
            res.redirect('/material')
            console.log('nome da categoria nao exite..')
        }
    }).catch(erro => {
        console.log("erro ==>", erro)
        res.redirect('/material')
    })

})
*/



// tela adicionar categoria
router.get("/add/categoria", (req, res) => {
    CategoriaMaterial.findAll().then(categoria => {
          res.render("material/addCategoria", {categoria: categoria});
    })
});

// Salvar Categoria
router.post("/save/categoria",  (req, res) => {
    var nome = req.body.nome;

    console.log(nome)
    CategoriaMaterial.create({
        nome: nome,
        slug: slugify(nome),
    }).then(() => {
        res.redirect("/home");
    });
});



// Material saida 

router.get('/Controle-material', (req, res) => {
    res.render('material/controleMaterial')
})



/*
 PARA EXIBICAO DE GRAFICOS 
 LEVAR EM CONSIDERACAO DADOS COM 

 # SESSAO ONDE MAIS TEM DETERMINADO ITEM 
 # QUANTIDADE TOTAL DO ITEM 
 # CRAIR ALERTA, PARA QUANDO ESTOQUE ESTIVER BAIXO
 # ADICIONAR FOTO DO MATERAIL 
 
*/




module.exports = router;


module.exports = router;