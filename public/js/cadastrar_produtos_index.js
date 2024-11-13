
const preview = document.querySelector('#preview')
const imagem_upload = document.querySelector('#imagem-upload')
const enviar = document.querySelector('#enviar')
const formulario = document.querySelector("form")
const menu = document.querySelector("#menu-button")


// Função de previe da imagem na página cadastrar produtos
function previewImagem(){

    const reader = new FileReader()

    try{

        reader.readAsDataURL(imagem_upload.files[0])

        reader.onload = ()=>{
        
            // imagem convertida em base64
            const imagem_base64 = reader.result
            
            // preview da imagem
            preview.src = imagem_base64
            preview.style.maxWidth="400px"   
            
            // formulario oculto para enviar o base64 no post
            const inputHidden = document.createElement('input')
            inputHidden.type = 'hidden'
            inputHidden.name= "imagem_base64"
            inputHidden.value = imagem_base64
            
            formulario.appendChild(inputHidden)
            
            console.log(inputHidden.value)
        }

    }catch(error){
        console.log(error)
    }
    
}

//enviar imagem do formulario da página cadastrar-produtos
if(enviar){
    enviar.addEventListener("click", ()=>{
        formulario.submit()    
    })
}




