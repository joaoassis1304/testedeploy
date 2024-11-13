import session from 'express-session'
import cliente from "../config/db.js"
import bcrypt from 'bcrypt'


//Função para descriptografar senha
async function descriptografarSenha(senha_inserida, senha_criptografada){

    const compare = await bcrypt.compare(senha_inserida, senha_criptografada)

    return compare
}

//Função para autentica usuario
export async function autenticacao(req, res){
    const{
        usuario,
        senha
    } =req.body

    try{        
    
        const query = await cliente.query(`SELECT * FROM usuario WHERE nome = '${usuario}';`)
    
        const senha_hash = query.rows[0].senha
        const nome_usuario =query.rows[0].nome
        
        const compare = await descriptografarSenha(senha, senha_hash)
        

        if(compare && usuario === nome_usuario){            
            req.session.login = {usuario:usuario, id:query.rows[0].id, notificacao:[]}
            res.redirect('/')
            console.log(req.session.login)
            
        }else{
           
            res.render('login',{title:'Login', erro:'Dados Inválidos!'})
           
        }

    }catch(erro){
        res.render('login',{title:'Login', erro:'Dados Inválidos!'})
        
    }   

}

