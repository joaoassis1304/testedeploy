let email = document.getElementById('email')
let assunto = document.getElementById('assunto')
let texto = document.getElementById('texto')


let email_valido = false
const regexEmail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function ChecarEmail()
{      
    // Valida o email usando o método test da regex
    if (regexEmail.test(email.value)) {
        email_valido = true       
    } else {
        email_valido = false        
    }
    return email_valido
}

function EnviarMensagem()
{
   const checar_email = ChecarEmail()
    if(email.value !='' && assunto.value !='' && texto.value!='' && checar_email)
    {
        return alert("Mensagem Enviada! Em Breve Responderemos.")

    }else if(checar_email === false){

        return alert("Email Inválido.")
        
    }else{
        return alert("Erro: Não é Possível Enviar a Mensagem Com Campo Vazio")
    }
    
}