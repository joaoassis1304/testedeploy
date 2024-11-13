import { Router } from "express"

import {pagina_inicial} from "../controller/pagina_inicial_controller.js"
import {get_produto, salvar_produto} from '../controller/produtos_controller.js'
import { autenticacao } from "../controller/autenticar_controller.js"
import { salvar_conta } from "../controller/criar_conta_controller.js"
import { salvar_carrinho, buscar_carrinho, excluir_carrinho } from "../controller/carrinho_controller.js"
import { exibirPerfil, salvarCartao, salvarEndereco} from "../controller/perfil_controller.js"
import { finalizar_compra, registrar_compra } from "../controller/compra_controller.js"

const router = Router()


//Página Principal
router.get('/',pagina_inicial)

//Página Login
router.get('/login', (req,res)=>{ res.render('login',{title:'Login'}) })

//Rota para validar login
router.post('/login-auth', autenticacao)

//Deslogar
router.get('/sair',(req,res)=>{ req.session.destroy((erro)=>{
        if(erro) erro
        else res.redirect('/')
    })
})


//Cadastro de usuário
router.get('/criar-conta',(req,res)=>{ res.render('criar_conta',{title: 'Criar Conta',erro:undefined})
})

//Salvar Usário no banco de dados
router.post('/salvar-conta', salvar_conta)


//Página Cadastrar Produtos
router.get("/cadastrar-produtos", (req,res)=>{ res.render('cadastrar_produtos',{ title: 'Cadastrar Produtos'})  
})

router.post('/salvar-produto', salvar_produto)


//Retorna Produtos do Banco
router.get('/produto-salvo/api',get_produto)


//Adicionar produto no carrinho pela modal
router.get('/adicionar-carrinho', salvar_carrinho)

//Página do carrinho
router.get('/carrinho', buscar_carrinho)

//Rota que exclui produtos do carrinho
router.get('/excluir-carrinho', excluir_carrinho)

//Rotas perfil
router.get('/perfil', exibirPerfil)

router.post('/salvar-endereco', salvarEndereco)

router.post('/salvar-cartao', salvarCartao)

//Rotas finalizar compra
router.get('/finalizar-compra',finalizar_compra)

router.get('/compra-finalizada', registrar_compra)

//Rota Suporte
router.get('/suporte', (req,res)=>{ res.render('suporte',
    {title : "suporte", mensagem: "Funcionalidade Indisponível no momento!", usuario:req.session.login.usuario, notificacao: req.session.login.notificacao})
 })

export default router