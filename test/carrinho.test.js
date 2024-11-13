import { vi, describe, it, expect, beforeEach } from 'vitest';
import { salvar_carrinho, buscar_carrinho, excluir_carrinho } from '../controller/carrinho_controller.js';  
import cliente from "../config/db.js";  

describe('Testando funções de carrinho', () => {
  
  
  let mockReq, mockRes, mockSession;

  beforeEach(() => {
    
    mockReq = {
      query: {
        nome_produto: 'Produto Teste',
        preco_carrinho: 100,
        quantidade: 2,
      },
      session: {
        login: { usuario: 'usuarioTeste' }
      }
    };
    
    mockRes = {
      redirect: vi.fn(),
      render: vi.fn(),
    };
  });

  
  describe('salvar_carrinho', () => {
    it('deve adicionar um produto ao carrinho', async () => {
      
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({ rows: [] })  
                                .mockResolvedValueOnce({ rows: [{ id: 1, produto: 'Produto Teste', categoria: 'Categoria Teste', preco: 100 }] })  
                                .mockResolvedValueOnce({ rows: [{ id: 1, nome: 'usuarioTeste' }] }); 

      await salvar_carrinho(mockReq, mockRes);

      
      expect(cliente.query).toHaveBeenCalledTimes(4);  
      expect(cliente.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO carrinho"));
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });

    it('deve atualizar o carrinho se o produto já estiver no carrinho', async () => {
     
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({ rows: [{ produto: 'Produto Teste' }] })  

      await salvar_carrinho(mockReq, mockRes);

      
      expect(cliente.query).toHaveBeenCalledWith(expect.stringContaining("UPDATE carrinho"));
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
    });
  });

  
  describe('buscar_carrinho', () => {
    it('deve retornar o carrinho do usuário', async () => {
      const mockQueryResult = { rows: [{ produto: 'Produto Teste', imagem: 'image.jpg' }] };

      
      vi.spyOn(cliente, 'query').mockResolvedValueOnce(mockQueryResult); 

      await buscar_carrinho(mockReq, mockRes);

      // Verificar se o render foi chamado com os dados do carrinho
      expect(mockRes.render).toHaveBeenCalledWith('carrinho', {
        title: 'Carrinho',
        usuario: 'usuarioTeste',
        notificacao: undefined,
        produtos: mockQueryResult.rows
      });
    });

    it('deve redirecionar para login se não houver sessão', async () => {
      
      mockReq.session = {};

      await buscar_carrinho(mockReq, mockRes);

      
      expect(mockRes.redirect).toHaveBeenCalledWith('/login');
    });
  });

  
  describe('excluir_carrinho', () => {
    it('deve excluir um produto do carrinho', async () => {
      
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({});
      
      await excluir_carrinho(mockReq, mockRes);
      
      expect(cliente.query).toHaveBeenCalledWith(expect.stringContaining("DELETE FROM carrinho"));
      expect(mockRes.redirect).toHaveBeenCalledWith('/carrinho');
    });
  });
});
