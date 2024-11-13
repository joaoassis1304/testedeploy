
document.querySelector('#pagar button').addEventListener('click',()=>{
    if(document.querySelector('#janela-modal-pagamento').style.display == ''){

        document.querySelector('#janela-modal-pagamento').style.display = 'block'
    }else{
        document.querySelector('#janela-modal-pagamento').style.display = ''
    }
})

document.querySelector('#cancelar-btn').addEventListener('click',()=>{
    document.querySelector('#janela-modal-pagamento').style.display = ''
})


document.querySelector('#confirmar-btn').addEventListener('click',()=>{
    console.log('clicado')
    let produtos =[...document.querySelectorAll('#area-produto')]
    let compra_finalizada =[]

    produtos.map((item)=>{
        compra_finalizada.push(           
        {
            produto:item.querySelector('#nome-produto').innerHTML,
            categoria:item.querySelector('#categoria-produto').innerHTML,
            quantidade: item.querySelector('#quantidade-produto').innerHTML
        }    
        )
    })
    const compra_codificada= (JSON.stringify(compra_finalizada))
    
    window.location.href = `/compra-finalizada?compra=${compra_codificada}&valor_total=${document.querySelector('#valor-total').innerHTML}`
})