
let produtos = [...document.querySelectorAll("#carrinho")]

let valor_total =0


produtos.map((item)=>{  

        let valor_unitario = parseFloat(item.querySelector('#valor-unitario').value)

        let valor = parseFloat(item.querySelector('#valor').innerHTML)        
        
        
        //Adicionar mais uma unidade do produto do carrinho
        item.querySelector('#area-quantidade #mais button').addEventListener('click',()=>{

            item.querySelector('#quantidade').innerHTML = parseInt(item.querySelector('#quantidade').innerHTML) +1
            valor += valor_unitario
            item.querySelector('#valor').innerHTML = valor.toFixed(2)

            atualizarValorTotal()       

        })
        
        //Subtrair uma unidadde do produto do carrinho
        item.querySelector('#area-quantidade #menos button').addEventListener('click',()=>{
            item.querySelector('#quantidade').innerHTML = parseInt(item.querySelector('#quantidade').innerHTML) -1
            valor -= valor_unitario
            item.querySelector('#valor').innerHTML = valor.toFixed(2)

            atualizarValorTotal()

            if( valor <=0 ){
               
                item.querySelector('#excluir a').click()
            }

        })
        
        //Excluir produto
        item.querySelector('#excluir a').addEventListener('click', ()=>{            
            
            item.style.display = "none"          
            
        })
})

function atualizarValorTotal(){

    valor_total = 0 // valor total é resato em 0 para refazer a somatoria total dos sub totais de cada produto

    produtos.map((item)=>{

        valor_total += parseFloat(item.querySelector('#valor').innerHTML)
        document.querySelector('#valor-total').innerHTML = valor_total

    })
}


let compra_finalizada= []


document.querySelector('#finalizar-compra-btn button').addEventListener('click',()=>{
    
    produtos.map((item)=>{
        
        compra_finalizada.push({produto:item.querySelector('#nome-produto-carrinho').innerHTML,
        categoria:item.querySelector('#categoria-produto-carrinho').innerHTML,
        quantidade:parseInt(item.querySelector('#quantidade').innerHTML)})        
    })
   const compra_codificada= (JSON.stringify(compra_finalizada))

   window.location.href = `/finalizar-compra?compra_finalizada=${compra_codificada}&valor_total=${document.querySelector('#valor-total').innerHTML}`
})


window.addEventListener('load', atualizarValorTotal())
