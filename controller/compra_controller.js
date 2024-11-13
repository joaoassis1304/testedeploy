
import cliente from "../config/db.js"


let compra=[]

export async function finalizar_compra(req,res){

    const{compra_finalizada,valor_total } = req.query

    let compra_finalizada_parse = JSON.parse(compra_finalizada)   
      
    console.log(typeof compra_finalizada_parse)
   
    compra=[]
    
    compra_finalizada_parse.map(async (item)=>{
        
        const imagem = await cliente.query(`SELECT imagem FROM produtos WHERE produto = '${item.produto}'`)
       
        compra.push({produto:item.produto, categoria: item.categoria, quantidade: item.quantidade ,imagem: imagem.rows[0].imagem,})
        
    }) 
    
    if(req.session.login){
        
        const query_endereco = await cliente.query(`SELECT * FROM endereco WHERE id_usuario =${req.session.login.id}`)
        const query_cartao = await cliente.query(`SELECT * FROM cartao WHERE id_usuario =${req.session.login.id}`)  

        res.render('finalizar_compra', {title:'Finalizar Compra', usuario:req.session.login.usuario, _compra:compra, valor_total:valor_total,
        endereco: query_endereco.rows[0], cartao:query_cartao.rows[0]})     

        
        

    }else{
        res.redirect('/login')
    }
    
}

let id_compra = 0

export async function registrar_compra(req,res){

    const{compra,valor_total}=req.query 

    let compra_parse = JSON.parse(compra)

    console.log(compra_parse)
    
    
    if(req.session.login){

        compra_parse.map(async (item)=>{

            id_compra++

            const produto = await cliente.query(`SELECT * from produtos WHERE produto='${item.produto}' `)            
            
            await cliente.query(`INSERT INTO compra (id_compra, id_usuario, id_produto, produto, categoria, quantidade, preco, data_compra) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
            [   
                id_compra,
                req.session.login.id , 
                produto.rows[0].id,
                item.produto,
                item.categoria,
                item.quantidade,
                valor_total,
                'NOW()'
            ]
            )        
            
        })
        
        const date = new Date();

        let dia = date.getDate();
        let mes = date.getMonth() + 1;
        let ano = date.getFullYear();
        let hora = date.getHours()
        let minutos = date.getMinutes()
        
        req.session.login.notificacao.push(`Compra Realizada ${dia}/${mes}/${ano} ${hora}:${minutos}`)
        
        res.render('compra_finalizada',{title:'Compra Finalizada', usuario:req.session.login.usuario, compra:compra_parse, valor_total: valor_total, notificacao: req.session.login.notificacao ,data:`${dia}/${mes}/${ano} ${hora}:${minutos}`})

    }else{
        res.redirect('/login')
    }
}