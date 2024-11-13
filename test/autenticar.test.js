import { vi, describe, it, expect, beforeEach } from 'vitest';
import { autenticacao } from '../controller/autenticar_controller.js';
import cliente from '../config/db.js';  
import bcrypt from 'bcrypt'; 

describe('Testando a função de autenticação', () => {  
  
  let mockReq, mockRes;

  beforeEach(() => {
    
    mockReq = {
      body: {
        usuario: 'usuarioTeste',
        senha: 'senhaCorreta',
      },
      session: {}
    };
    
    mockRes = {
      redirect: vi.fn(),
      render: vi.fn(),
    };
  });

  // Testando a autenticação bem-sucedida
  describe('autenticacao', () => {
    it('deve autenticar o usuário e redirecionar para a página inicial', async () => {
      
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({
        rows: [{ nome: 'usuarioTeste', senha: '$2b$10$hashSenhaFicticiaAqui' }]
      });

      
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      
      await autenticacao(mockReq, mockRes);

      // Verifica se o redirecionamento para a página inicial foi feito
      expect(mockRes.redirect).toHaveBeenCalledWith('/');
      expect(mockReq.session.login).toEqual({
        usuario: 'usuarioTeste',
        id: undefined,  
        notificacao: [],
      });
    });
    
    // Simula senha incorreta
    it('deve renderizar o login com erro se a senha estiver incorreta', async () => {
      
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({
        rows: [{ nome: 'usuarioTeste', senha: '$2b$10$hashSenhaFicticiaAqui' }]
      });

      //Simulando falha na comparação da senha
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      // Chama a função de autenticação
      await autenticacao(mockReq, mockRes);

      // Verifica se a função render foi chamada com a mensagem de erro
      expect(mockRes.render).toHaveBeenCalledWith('login', { title: 'Login', erro: 'Dados Inválidos!' });
    });

    it('deve renderizar o login com erro se o usuário não for encontrado', async () => {
      // Mock da consulta ao banco de dados, retornando um array vazio (usuário não encontrado)
      vi.spyOn(cliente, 'query').mockResolvedValueOnce({ rows: [] });

      // Chama a função de autenticação
      await autenticacao(mockReq, mockRes);

      // Verifica se a função render foi chamada com a mensagem de erro
      expect(mockRes.render).toHaveBeenCalledWith('login', { title: 'Login', erro: 'Dados Inválidos!' });
    });

    it('deve renderizar o login com erro se ocorrer um erro de banco de dados', async () => {
      // Simulando um erro no banco de dados
      vi.spyOn(cliente, 'query').mockRejectedValueOnce(new Error('Erro de banco de dados'));

      // Chama a função de autenticação
      await autenticacao(mockReq, mockRes);

      // Verifica se a função render foi chamada com a mensagem de erro
      expect(mockRes.render).toHaveBeenCalledWith('login', { title: 'Login', erro: 'Dados Inválidos!' });
    });
  });
});
