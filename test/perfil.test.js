import { describe, it, expect, vi } from 'vitest';
import { exibirPerfil, salvarEndereco, salvarCartao } from '../controller/perfil_controller.js';
import cliente from "../config/db.js";

vi.mock("../config/db.js");

describe('Testes das funções de perfil', () => {

  
  const mockRes = () => {
    const res = {};
    res.render = vi.fn();
    res.redirect = vi.fn();
    return res;
  };

  describe('exibirPerfil', () => {
    it('deve redirecionar para /login se o usuário não estiver logado', async () => {
      const req = { session: { login: null } };
      const res = mockRes();

      await exibirPerfil(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('deve exibir o perfil do usuário logado', async () => {
      const req = { session: { login: { id: 1, usuario: 'usuarioTeste' } } };
      const res = mockRes();

      cliente.query.mockResolvedValueOnce({ rows: [{ rua: 'Rua Teste' }] });
      cliente.query.mockResolvedValueOnce({ rows: [{ numero_cartao: '1234' }] });

      await exibirPerfil(req, res);

      expect(res.render).toHaveBeenCalledWith('perfil', {
        title: 'Prefil',
        usuario: 'usuarioTeste',
        endereco: { rua: 'Rua Teste' },
        cartao: { numero_cartao: '1234' }
      });
    });
  });

  describe('salvarEndereco', () => {
    it('deve atualizar o endereço se ele já existir', async () => {
      const req = {
        session: { login: { id: 1 } },
        body: { rua: 'Nova Rua', bairro: 'Novo Bairro', numero: '123', complemento: '', cep: '12345678', cidade: 'Cidade', uf: 'UF' }
      };
      const res = mockRes();

      cliente.query.mockResolvedValueOnce({ rows: [{ id_usuario: 1 }] });
      cliente.query.mockResolvedValueOnce();

      await salvarEndereco(req, res);
      
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });

    it('deve inserir novo endereço se ele não existir', async () => {
      const req = {
        session: { login: { id: 1 } },
        body: { rua: 'Nova Rua', bairro: 'Novo Bairro', numero: '123', complemento: '', cep: '12345678', cidade: 'Cidade', uf: 'UF' }
      };
      const res = mockRes();

      cliente.query.mockResolvedValueOnce({ rows: [] });
      cliente.query.mockResolvedValueOnce();

      await salvarEndereco(req, res);
      
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });
  });

  describe('salvarCartao', () => {
    it('deve atualizar o cartão se ele já existir', async () => {
      const req = {
        session: { login: { id: 1 } },
        body: { numero_cartao: '1234567890123456', data_val: '12/24', cvv: '123', cpf: '12345678901' }
      };
      const res = mockRes();

      cliente.query.mockResolvedValueOnce({ rows: [{ id_usuario: 1 }] });
      cliente.query.mockResolvedValueOnce();

      await salvarCartao(req, res);
      
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });

    it('deve inserir um novo cartão se ele não existir', async () => {
      const req = {
        session: { login: { id: 1 } },
        body: { numero_cartao: '1234567890123456', data_val: '12/24', cvv: '123', cpf: '12345678901' }
      };
      const res = mockRes();

      cliente.query.mockResolvedValueOnce({ rows: [] });
      cliente.query.mockResolvedValueOnce();

      await salvarCartao(req, res);
      
      expect(res.redirect).toHaveBeenCalledWith('/perfil');
    });
  });

});
