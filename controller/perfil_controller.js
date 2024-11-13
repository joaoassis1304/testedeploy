import cliente from "../config/db.js"


export async function exibirPerfil(req,res){

    if(req.session.login){

        const query_endereco = await cliente.query(`SELECT * FROM endereco WHERE id_usuario =${req.session.login.id}`)
        const query_cartao = await cliente.query(`SELECT * FROM cartao WHERE id_usuario =${req.session.login.id}`)    

        res.render('perfil',{title:'Prefil', usuario:req.session.login.usuario, endereco:query_endereco.rows[0], cartao:query_cartao.rows[0]})
        console.log(query_endereco.rows[0])
        console.log(query_cartao.rows[0])

        
    }else{
        res.redirect('/login')
    }
    
    
}

export async function salvarEndereco(req,res){

    const{rua, bairro, numero, complemento, cep, cidade, uf }=req.body

    const query = await cliente.query(`SELECT * FROM endereco WHERE id_usuario = ${req.session.login.id} `)

    const endereco = query.rows[0]

    if(endereco != undefined){
                
       await cliente.query(`UPDATE endereco set rua='${rua}', bairro='${bairro}', numero='${numero}', complemento='${complemento}', cep='${cep}', cidade='${cidade}',uf='${uf}' WHERE id_usuario = '${req.session.login.id}'`)
        res.redirect('/perfil')
         
    }else{
        await cliente.query(`INSERT INTO endereco (id_usuario, rua, bairro,numero,complemento,cep,cidade,uf) VALUES (${req.session.login.id},'${rua}','${bairro}','${numero}','${complemento}','${cep}','${cidade}','${uf}');`)

        res.redirect('/perfil')
    }
    
}

export async function salvarCartao(req,res){

    const{numero_cartao, data_val, cvv, cpf }=req.body

    const query = await cliente.query(`SELECT * FROM cartao WHERE id_usuario = ${req.session.login.id} `)

    const cartao = query.rows[0]

    if(cartao != undefined){
                
       await cliente.query(`UPDATE cartao set numero='${numero_cartao}', data_val='${data_val}', cvv='${cvv}', cpf='${cpf}' WHERE id_usuario = '${req.session.login.id}'`)
        res.redirect('/perfil')
         
    }else{
        await cliente.query(`INSERT INTO cartao (id_usuario, numero, data_val, cvv, cpf) VALUES (${req.session.login.id},'${numero_cartao}','${data_val}','${cvv}','${cpf}');`)

        res.redirect('/perfil')
    }
    
}