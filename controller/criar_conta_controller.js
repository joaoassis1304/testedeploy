import cliente from "../config/db.js";

import bcrypt from 'bcrypt'

export async function gerarSenhaHash(senha){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(senha, salt)
    return hash
}

export async function salvar_conta(req,res){
    try{
        const{
            usuario_nome,
            email,
            senha1,
            senha2,
        }=req.body   

        
        if(senha1 === senha2 ){

            const senha_criptografada = await gerarSenhaHash(senha1)

            await cliente.query(`INSERT INTO usuario (nome, email, senha) VALUES ('${usuario_nome}',
            '${email}', '${senha_criptografada}')`)

            res.render('conta_criada',{usuario:usuario_nome})

        }else{
            res.render('criar_conta',{title:"Criar Conta", erro:"Senhas não conferem Tente Novamente!"})
        }        

    }catch(erro){

        if(erro == 'error: duplicar valor da chave viola a restrição de unicidade "usuario_nome_key"' ){
            res.render('criar_conta',{title:"Criar Conta", erro:"Usuário existente use outro nome!"})
        }
        
        console.log(erro)
    }   
    
    
}