
import cliente from '../config/db.js'


export async function salvar_produto(req,res){  

    try
    {
        const{
            produto,
            categoria,
            preco,
            quantidade,
            imagem_base64
        } = req.body

        await cliente.query(`INSERT INTO produtos (produto, categoria, preco, quantidade, imagem) VALUES ('${produto}', '${categoria}', ${preco},${quantidade},'${imagem_base64}');`)
        
        console.log("DADOS SALVOS!")
            
        //alterar para redirect /cadastrar-produtos
        res.redirect('/')
    }catch(erro)
    {
        console.log(erro)
    }    
    
}

export async function get_produto(req,res){
    
    const{
        nome_produto,
        categoria
    }=req.query

    if(categoria){        
        const result = await cliente.query(`SELECT * FROM produtos WHERE categoria ='${categoria}';`)
        const rows = result.rows
        res.send(rows)
    }else if(nome_produto){
        const result = await cliente.query(`SELECT * FROM produtos WHERE produto ='${nome_produto}';`)
        const rows = result.rows
        res.send(rows)
        res.redirect('/')
    }else{
        const result = await cliente.query('SELECT * FROM produtos;') 

        const rows = result.rows
        res.send(rows)
    }
    
}