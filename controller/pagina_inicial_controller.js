
export function pagina_inicial(req,res)
{
    if(req.session.login != undefined){
              
        if(req.session.login.usuario === 'admin'){
            res.render('index',{title: "Home", usuario:req.session.login.usuario, notificacao: req.session.login.notificacao, admin:true})
        }else{
            res.render('index',{title: "Home",usuario:req.session.login.usuario, notificacao: req.session.login.notificacao})
        }
    }else{
    res.render('index',{title: "Home",usuario:undefined})
    }  
}
