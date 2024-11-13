const area_produto = document.querySelector('#area-produto')
const janela_modal_carrinho = document.querySelector("#janela-modal-carrinho")

fetch('/produto-salvo/api').then((response)=>{

    return response.json()
}).then((data)=>{ 
    
    
    data.map((item)=>{
        console.log(item.image)
        area_produto.innerHTML+=
        `
            <div id="produto">
        
                    <a href="">
                        <div id="produto-imagem"> <img src="${item.imagem}" alt=""> </div>           
                    </a>
                    <div id="nome-produto">${item.produto}</div>
                    <div id="categoria-produto">${item.categoria}</div>
                    <div id="preco-produto">R$${item.preco}</div> 

            </div>

        `    
    })

    let produtos=[...document.querySelectorAll('#produto')]
    let botoes_menu =[...document.querySelectorAll('#menu-item button')]

    //Campo de pesquisa
   
    document.querySelector('#buscar-button').addEventListener('click',()=>{

        console.log(document.querySelector('#busca').value )

        let pesquisa = document.querySelector('#busca').value

        const regex = new RegExp(pesquisa, 'i')
        
        produtos.map((item)=>{
            if(regex.test(item.querySelector('#nome-produto').innerHTML)){

            }else{
                item.style.display = 'none'
            }
        })
    })

    //Mostar todos os itens caso o input de pesquisa esteja vazio
    document.querySelector('#busca').addEventListener('input',()=>{
        if(document.querySelector('#busca').value ==''){
            produtos.map((item)=>{
                item.style.display='block'
            })
        }
    })
    
    //botões do menu-burger
    botoes_menu.map((item)=>{

        item.addEventListener('click',()=>{

            if(item.innerHTML == 'Todas'){                 
                produtos.map((i)=>{
                    i.style.display = 'block'
                    console.log(item.innerHTML)
                })
            }else{
                produtos.map((i)=>{
                    if(i.querySelector('#categoria-produto').innerHTML != item.innerHTML){
                        i.style.display='none'
                        console.log(item.innerHTML)
                    }
                })
            }                    
        })
    })
    
    produtos.map((item)=>{

        item.querySelector("a").addEventListener('click',(e)=>{

            e.preventDefault()

            console.log("clicou no produto!")

            if(janela_modal_carrinho.style.display == "" ){

                janela_modal_carrinho.style.display = "flex"    
            }

            janela_modal_carrinho.querySelector("#imagem-produto-carrinho img").src =item.querySelector("#produto-imagem img").src
            janela_modal_carrinho.querySelector('#nome-produto-carrinho').innerHTML = item.querySelector('#nome-produto').innerHTML
            janela_modal_carrinho.querySelector('#categoria-produto-carrinho').innerHTML = item.querySelector('#categoria-produto').innerHTML
            janela_modal_carrinho.querySelector('#valor').innerHTML = item.querySelector('#preco-produto').innerHTML
            
            let valor = parseFloat(janela_modal_carrinho.querySelector('#valor').innerHTML.replace("R$","").trim())
            let valor_inicial = parseFloat(item.querySelector('#preco-produto').innerHTML.replace("R$","").trim())
            let quantidade = 1
           

            janela_modal_carrinho.querySelector('#quantidade').innerHTML= parseInt(quantidade)

            janela_modal_carrinho.querySelector('#mais button').addEventListener('click', ()=>{

                quantidade+= 1
                janela_modal_carrinho.querySelector('#quantidade').innerHTML = parseInt(quantidade)

                valor += valor_inicial                
                janela_modal_carrinho.querySelector('#valor').innerHTML = valor.toFixed(2)
               

            })
            
            janela_modal_carrinho.querySelector('#menos button').addEventListener('click', ()=>{

                quantidade -=1
                janela_modal_carrinho.querySelector('#quantidade').innerHTML = parseInt(quantidade)
                
                valor -= valor_inicial
                janela_modal_carrinho.querySelector('#valor').innerHTML = valor.toFixed(2)                

                if(parseInt(quantidade) <=0){
                    janela_modal_carrinho.style.display=""
                    quantidade=1
                }
                
            })
            janela_modal_carrinho.querySelector("#adicionar-carrinho-btn a").addEventListener('click',()=>{                
                                
                janela_modal_carrinho.querySelector("#adicionar-carrinho-btn a").href =
                `/adicionar-carrinho/?nome_produto=${janela_modal_carrinho.querySelector('#nome-produto-carrinho').innerHTML}&preco_carrinho=${valor}&quantidade=${quantidade}`

            })
        })


    })

})


//fechar janela modal
document.querySelector("#fechar button").addEventListener("click",()=>{
    janela_modal_carrinho.style.display=""
})



