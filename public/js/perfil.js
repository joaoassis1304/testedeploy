const janela_modal_endereco = document.querySelector('#janela-modal-endereco')
const janela_modal_cartao = document.querySelector('#janela-modal-cartao')
const area_perfil = document.querySelector("#area-perfil")
const endereco = [...document.querySelectorAll('#endereco p')]

//Janela Modal Endereço
area_perfil.querySelector('#adicionar-editar-endereco').addEventListener('click',()=>{

    if(janela_modal_endereco.style.display == ""){
        janela_modal_endereco.style.display = "flex"
    }    

})

janela_modal_endereco.querySelector('#cancelar-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    janela_modal_endereco.style.display = ""
})


//Janela Modal Cartão
area_perfil.querySelector('#adicionar-editar-cartao').addEventListener('click',()=>{

    if(janela_modal_cartao.style.display == ""){
        janela_modal_cartao.style.display = "flex"
    }    

})
janela_modal_cartao.querySelector('#cancelar-btn').addEventListener('click',(e)=>{
    e.preventDefault()
    janela_modal_cartao.style.display = ""
})


//validação dos campos numericos
function formatarNumero()
{
    let numero = document.getElementById('numero')
    numero.value = numero.value.replace(/\D/g,'')
}

function formatarCep()
{
    let cep_input = document.getElementById('cep')
    cep_input.value = cep_input.value.replace(/\D/g, '');
}
function formatarNumCartao()
{
    let numero_cartao_input = document.getElementById('numero_cartao')
    numero_cartao_input.value = numero_cartao_input.value.replace(/\D/g, '');
}
function formatarDataVal()
{
    let data_input = document.getElementById('data_val')
    data_input.value = data_input.value.replace(/\D/g, '');

    //adiciona barra depois de 2 caracteres
    if (data_input.value.length >= 2) data_input.value = data_input.value.replace(/^(\d{2})(\d)/, '$1/$2');
}

function formatarCvv()
{
    let cvv_input = document.getElementById('cvv')
    cvv_input.value = cvv_input.value.replace(/\D/g, '');
}

function formaterCpf()
{
    let cpf_input = document.getElementById('cpf')
    cpf_input.value =  cpf_input.value.replace(/\D/g, '');
}