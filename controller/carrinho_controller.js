import cliente from "../config/db.js"


export async function salvar_carrinho(req,res){

    const{
        nome_produto,        
        preco_carrinho,        
        quantidade    
    } =req.query

    //res.send(req.query)
    try{
        if(req.session.login){            

            const verificar = await cliente.query(`SELECT produto FROM carrinho WHERE produto = '${nome_produto}' AND nome_usuario = '${req.session.login.usuario}'`)
                        
            if(verificar.rows != ''){
               
                await cliente.query(`UPDATE carrinho set preco_carrinho = preco_carrinho + ${preco_carrinho}, quantidade = quantidade + ${quantidade} WHERE produto = '${nome_produto}'`)
                
            }else{

                const produto = await cliente.query(`SELECT * from produtos WHERE produto='${nome_produto}'`)
                const _usuario = await cliente.query(`SELECT id,nome from usuario WHERE nome='${req.session.login.usuario}'`)
                console.dir(produto.rows[0], { depth: null });
                console.dir(_usuario.rows[0], { depth: null });                
                await cliente.query(
                    `INSERT INTO carrinho 
                    (id_produto, produto, categoria, preco_unitario, preco_carrinho, quantidade, id_usuario, nome_usuario) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [
                        produto.rows[0].id,
                        produto.rows[0].produto,
                        produto.rows[0].categoria,
                        produto.rows[0].preco,
                        parseFloat(preco_carrinho),
                        parseInt(quantidade),
                        _usuario.rows[0].id,
                        _usuario.rows[0].nome
                    ]
                );
            }           

            res.redirect('/')

        }else{
            res.redirect('/login')
        }        

    }catch(error){
        console.log(error)
        
    }
    
}

export async function buscar_carrinho(req,res){

    if(req.session.login){

        console.log(req.session.login)
        const produtos_carrinho = await cliente.query(`SELECT carrinho.*, produtos.imagem FROM carrinho JOIN produtos on carrinho.produto = produtos.produto WHERE nome_usuario = '${req.session.login.usuario}'  `)
        
        res.render('carrinho',{title:'Carrinho', usuario:req.session.login.usuario,notificacao:req.session.login.notificacao, produtos:produtos_carrinho.rows})
        
    }else{
        res.redirect('/login')
    }
    
}

export async function excluir_carrinho(req,res){

    const{
        produto,
        quantidade,
    } =req.query    
    
    await cliente.query(`DELETE FROM carrinho WHERE produto = '${produto}' AND quantidade = ${parseInt(quantidade)}`)

    res.redirect('/carrinho')
}