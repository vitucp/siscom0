
function auth(req, res, next){
    if(req.session.user != undefined){
            next();
    }else{
        console.log('============================> Sessao inspirada')
        res.redirect('/login')
    }
}


module.exports = auth