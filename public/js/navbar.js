
let menu = document.querySelector('#menu-button')
let usuario_button = document.querySelector('#usuario-button')
let notificacao = document.querySelector('#notificacao-button')

//Menu-Burger
if(menu){
    menu.addEventListener("click",()=>{
        console.log("clicado!")
        if(document.querySelector("#menu-content").style.display == ""){
            document.querySelector("#menu-content").style.display="block"
        }else{
            document.querySelector("#menu-content").style.display=""
        }        
    })
}

//Icone Usuário
usuario_button.addEventListener("click",()=>{

    
    if(document.querySelector("#usuario-area").style.display == ""){

        document.querySelector("#usuario-area").style.display = "flex"
    }else{
        document.querySelector("#usuario-area").style.display = ""
    }   

})

//Icone Notificacao
notificacao.addEventListener('click', ()=>{
    if(document.querySelector('#notificacao-area').style.display == ""){

        document.querySelector('#notificacao-area').style.display = 'block'
    }else{

        document.querySelector('#notificacao-area').style.display = ""
    }
})

window.addEventListener('click',(e)=>{
    
    if(e.target.className !== 'nav-menu' && document.querySelector("#menu-content").style.display !== "")
    {
        document.querySelector("#menu-content").style.display = ""
    }

    if(e.target.className !== 'nav-notificacao' && document.querySelector("#notificacao-area").style.display !== "")
    {
        document.querySelector("#notificacao-area").style.display = ""
    }

    if(e.target.className !== 'nav-usuario' && document.querySelector("#usuario-area").style.display !== "")
    {
        document.querySelector("#usuario-area").style.display = ""
    }
})