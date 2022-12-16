const { render } = require("ejs");
const express = require("express");
const router = express.Router();
const auth = require('../midlewares/adminAuth')
const Categoria =  require('../categories/Category') 
const Artigo = require('../articles/Article')
const slugify = require("slugify");
const Category = require("../categories/Category");
const User = require("../users/Users")
const { Op } = require("sequelize");

//  upload

const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        
        cb(null, 'public/images/icones/')
    },
    filename: async function(req, file, cb){
        var nome = await req.body.title
        //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
        cb(null, nome + path.extname(file.originalname))
        console.log('nome do arquivo ===>>>', filename )
    }
})
const uploadIcons = multer({storage})

// Download

const arquivoParaDownload = multer.diskStorage({
    destination: function(req, res, cb){
        
        cb(null, 'download/artigo/')
    },       
    filename: async function(req, file, cb){
        var nomeArquivo = await req.body.title
        //cb(null, file.originalname + Date.now() + path.extname(file.originalname))
        cb(null, nomeArquivo + path.extname(file.originalname))
        console.log('nome do arquivo 2 ===>>>', filename )
    }
})
const download = multer({arquivoParaDownload})

// HOME 

router.get('/faq', (req, res) => {
    Artigo.findAll({
        include: [{model: Category}]
    }).then(artigo => {
        var user = req.session.user
        console.log('teste req.session ====>', user)
        res.render('faq/home', {artigo: artigo, user: user})
    })
})

// categorias

router.get('/faq/categoria/:id', async (req, res) => {

    var categoria = req.params.id

    Categoria.findOne({where: {title: categoria}}).then((categoria) => {
        if(categoria){


           Artigo.findAll({ include: [{model: Category}], where: { categoryId : categoria.id } }).then((artigo) => {
     
            
            console.log(' resultado ===>', artigo)   
            var user = req.session.user
            res.render('faq/home', {artigo: artigo, user:user})
           
        }).catch((erro) => {
         console.log('erro +===>', erro)
        })
           
        }else{
            console.log('erro else ===>', categoria  )
            res.redirect('/faq')
        }
    }).catch((erro) => {
        console.log('erro ...', erro)
    })


})


// BUSCA artigos

router.post('/busca-artigo', async (req, res) => {
    var busca = req.body.busca;

    console.log('teste busca ===> ', busca)

    var artigo = await Artigo.findAll({ include: [{model: Category}], where: {  [Op.or]: [
        {title: busca},
    ]}});
    
    res.render('faq/home', {artigo: artigo})
})

//  Criar artigo 

router.get('/faq/artigo', auth,(req, res) => {
    Categoria.findAll({}).then(categoria => {

        res.render('faq/artigos/artigo', {categoria: categoria})
    })
})

// Salvar  video

const  uploadFaqVideo =  multer({
    
    storage: multer.diskStorage({
        destination: async (req, file, callback ) => {
             req.session.user.id
            const fs = require('fs');
           // const dirVerificar = path.resolve('uploads/cnh/')+req.session.user.id;
           
            const dir = path.resolve('uploads/'+req.session.user.id+'_user/')

            if (!fs.existsSync(dir)){
                //Efetua a criação do diretório
                fs.mkdirSync(dir);
                fs.mkdirSync(path.resolve('uploads/'+req.session.user.id+'_user/faq'));
            }else{
               let dirFaq = path.resolve('uploads/'+req.session.user.id+'_user/faq');
               if(!fs.existsSync (dirFaq)){
                fs.mkdirSync(path.resolve('uploads/'+req.session.user.id+'_user/faq'))
                callback(null, path.resolve('uploads/'+req.session.user.id+'_user/faq'));

               }
              callback(null, path.resolve('uploads/'+req.session.user.id+'_user/faq'));
            }

        },
        filename: (req, file, callback) => {
            const time = new Date().getTime();
            const  {id} = req.session.user

    
            callback(null, `${file.originalname}_${time}_${id}`);
        }
    })
})

// *** ** * ** **  ** * * * ** * * ** ** * * ** * * * TESTE 


const  uploadDocumentos =  multer({

    storage: multer.diskStorage({
        destination: async (req, file, callback ) => {
             let id = req.session.user.id
            const fs = require('fs');
           // const dirVerificar = path.resolve('uploads/cnh/')+req.session.user.id;

           User.findByPk(id).then(user => {

            fs.rm(path.resolve('uploads/'+req.session.user.id+'_user/documentos/'+user.pathDocumentos), { recursive:true }, (err) => {
                if(err){
                    // File deletion failed
                    console.error("ERRO:", err.message);
                    return;
                }
                console.log("File deleted successfully");
                  
            })

           }).catch(erro => {
            console.log('ERRO: ', erro)
           })

            const dir = path.resolve('uploads/'+req.session.user.id+'_user/')

            if (!fs.existsSync(dir)){
                //Efetua a criação do diretório
               await fs.mkdirSync(dir);
               await fs.mkdirSync(path.resolve('uploads/'+req.session.user.id+'_user/faq/'));
            }else{
               let dirFaq = path.resolve('uploads/'+req.session.user.id+'_user/faq/');
               if(!fs.existsSync (dirFaq)){
                await fs.mkdirSync(path.resolve('uploads/'+req.session.user.id+'_user/faq/'))
                await callback(null, path.resolve('uploads/'+req.session.user.id+'_user/faq/'));

               }
              callback(null, path.resolve('uploads/'+req.session.user.id+'_user/faq/'));
            }
        
    },
    fileFilter: (req, file, cb) => {


        if (allowedMines.includes(file.mimetype)){
            cb(null, true);
        }else{
            cd(new Error('arquivo nao suportado.'));
        }
    },
    filename: async (req, file, callback) => {

        const  {id} = req.session.user


           await callback(null, `${file.originalname}`);
        
        
    }
    })

})

router.post("/salvar/artigo",  auth, uploadDocumentos.single("faqVideo"), async (req, res) => {
    //var title = req.body.title;
    // var body = req.body.body;
    //var categoria = req.body.categoria;
    // var faqVideo = req.body.faqVideo;
   var {id} = req.session.user

    let {title, body, categoria, tituloVideo, nomeArquivoDownload, arquivoDownload } = req.body
    
  //  console.log('TESTE VIDEO **** * ** * * ** * * * * * * * ** * * ****** ====> ', req.file,  req.file.filename, req.file.size, )
    var autor = await User.findByPk(id)

// video
if(!req.file ){
    var nomeArquivo = 'null'
    var tamanho = 0
    var url = 'null' 
}else{
    var nomeArquivo = req.file.filename
    var tamanho = req.file.size
    var url = 'null' 
}

// arquivo para download
if(!req.file ){
    var nomeArquivo = 'null'
    var tamanho = 0
    var url = 'null' 
}else{
    var nomeArquivo = req.file.filename
    var tamanho = req.file.size
    var url = 'null' 
}
     
//console.log('teste up title ====> ', tituloVideo )  

    Artigo.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoria,
        autor: autor.nomeGuerra,
        nomeArquivo: nomeArquivo,
        tamanho: tamanho,
        tituloVideo: '',
        nomeArquivoDownload: "",
        arquivoDownload,
        
    }).then(() => {
        res.redirect("/faq");
    });
});

// VER ARTIGO

router.get('/faq/ver/artigo/:id', (req, res) => {

    var id = req.params.id;
    
    Artigo.findByPk(id).then(async artigo => {
        if(artigo != undefined){
            console.log('teste =====>', artigo)
          await  res.render('faq/artigos/verArtigo', {artigo: artigo})

        }else{
            var erros  = []
            res.redirect('/perfil', {erros: erros})
        }
    }).catch(erro => {
        
        console.log('ERRO: ', erro)
    })
})

// meus artigos

router.get('/faq/editar', auth, async(req, res) => {
    var {id} = req.session.user
    var user = await User.findByPk(id)

    Artigo.findAll({
        include: [{model: Category}]
    }).then(artigo => {

  
    res.render('faq/artigos/meusArtigos', {artigo: artigo, user: user})
 
     
    })
})

// ATUALIZAR ARTIGO

router.post("/atualizar/artigo",  auth, (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var categoria = req.body.categoria;

    console.log('teste atualizar ===> +++++.', 'id => ',id,'titulo =>',  title,'texto =>', body,'categoria =>',  categoria)

    Artigo.update({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoria,
        
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/faq/editar");
    }).catch(err => {
        res.redirect("/");
        console.log(err)
    });
});


// Editar artigo

router.get('/faq/editar/:id',  auth, async(req, res) => {
    var id = req.params.id;
    
    console.log('teste ====>', id, req.session.user)
    

    Artigo.findByPk(id, {
        include: [{model: Category}]
    }).then(artigo => {
        console.log(artigo)
        res.render('faq/artigos/editarArtigo', {artigo: artigo})
    })
})


// Deletar artigo

router.get("/deletar/:id", auth, (req, res) => {
    var id = req.params.id;
    if(id != undefined){
        if(!isNaN(id)){
            Artigo.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/faq/editar");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else{ // NULL
        res.redirect("/admin/articles");
    }
});


// CRIAR CATEGORIA 

router.get('/faq/categoria', auth,(req, res) => {
    res.render('faq/categorias/categoria')
})


//SALVAR CATEGORIA 

router.post("/salvar/categoria", uploadIcons.single("icone") , auth, (req, res) => {
    var title = req.body.title;
    var link = req.body.link;
    if(title != undefined){
        console.log('teste ver nome -===>', req.file.filename)
        var img = req.file.filename
        Categoria.create({
            title: title,
            slug: img,
        }).then(() => {
            res.redirect("/faq");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});

// editar categoria

router.get('/faq/ver/categorias', (req, res) => {
    
    Categoria.findAll().then(categoria => {
        if(categoria != undefined){
            console.log('teste =====>', categoria)

            res.render('faq/categorias/editar', {categoria: categoria})

        }else{
            var erros  = []
            res.redirect('/faq', {erros: erros})
        }
    })
})


// deletar categoria
router.post("/categories/delete", auth, (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/faq/ver/categorias");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/categories");
        }
    }else{ // NULL
        res.redirect("/admin/categories");
    }
});


 // Renomear categoria 
 router.get("/faq/categoria/editar/:id", uploadIcons.single("icone"), auth, (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories"); 
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("faq/categorias/renomear",{category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");        
    })
});


// Atualizar categoria
router.post("/atualizar/categoria", uploadIcons.single("icone"),  auth,(req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    console.log('ver file name ===>', req)
    var img = req.file.filename
    
    Category.update({title: title, slug: img },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/faq/ver/categorias");    
    })

});

module.exports = router;
