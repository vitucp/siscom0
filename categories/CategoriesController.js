const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");


// cadastrar categoria 

router.get("/admin/categories/new",(req, res) => {
    res.render("admin/categories/new");
});


// salvar 
router.post("/categories/save", (req, res) => {
    var title = req.body.title;

    console.log('teste ====>> ', title)
    if(title != undefined){
        
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new");
    }
});


// listar categorias 
router.get("/admin/categories",  (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });
});

// deletar categoria
router.post("/categories/deleteX", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/categories");
        }
    }else{ // NULL
        res.redirect("/admin/categories");
    }
});

 // Editar categoria 
router.get("/admin/categories/edit/X:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/categories"); 
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){
            res.render("admin/categories/edit",{category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");        
    })
});

/*
// Atualizar categoria
router.post("/categories/updateX", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title) },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/faq/ver/categorias");    
    })

});
*/
module.exports = router;