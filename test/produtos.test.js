import { expect,describe, it, vi } from 'vitest';
import { salvar_produto } from '../controller/produtos_controller';


const mockReq = {
  body: {
    produto: 'Produto Teste',
    categoria: 'Categoria Teste',
    preco: 100,
    quantidade: 50,
    imagem_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  }
};



const mockRes = {
  redirect: vi.fn()
};

describe('salvar_produto', () => {
  it('Deve salvar um novo produto.', async () => {
    await salvar_produto(mockReq, mockRes);
    expect(mockRes.redirect).toHaveBeenCalledWith('/');
  });


  it('deve manipular erros', async () => {
    const errorMessage = 'Erro ao salvar o produto';
    
  
    vi.spyOn(console, 'log').mockReturnValue();   
    
    vi.stubGlobal('salvar_produto', async () => {
      throw new Error(errorMessage);
    });
  
    try {
      await salvar_produto(mockReq, mockRes);
    } catch (e) {
      expect(console.log).toHaveBeenCalledWith(errorMessage);
    }
  });
});