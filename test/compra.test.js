import { describe, it, expect, vi } from 'vitest';
import { finalizar_compra, registrar_compra } from '../controller/compra_controller.js';
import cliente from "../config/db.js";

vi.mock("../config/db.js");

describe('Testes das funções de compra', () => {

  const mockRes = () => {
    const res = {};
    res.render = vi.fn();
    res.redirect = vi.fn();
    return res;
  };

  describe('finalizar_compra', () => {
    it('deve redirecionar para /login se o usuário não estiver logado', async () => {
      const req = { session: { login: null }, query: { compra_finalizada: '[]', valor_total: 100 } };
      const res = mockRes();

      await finalizar_compra(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('deve exibir a tela de finalização de compra com os dados do usuário', async () => {
      const req = { 
        session: { login: { id: 1, usuario: 'usuarioTeste' } },
        query: { compra_finalizada: JSON.stringify([{ produto: 'Produto1', categoria: 'Categoria1', quantidade: 2 }]), valor_total: 200 }
      };
      const res = mockRes();

      cliente.query
        .mockResolvedValueOnce({ rows: [{ imagem: 'imagem1.jpg' }] })
        .mockResolvedValueOnce({ rows: [{ rua: 'Rua Teste' }] })
        .mockResolvedValueOnce({ rows: [{ numero_cartao: '1234' }] });

      await finalizar_compra(req, res);

      expect(res.render).toHaveBeenCalledWith('finalizar_compra', {
        title: 'Finalizar Compra',
        usuario: 'usuarioTeste',
        _compra: [
          { produto: 'Produto1', categoria: 'Categoria1', quantidade: 2, imagem: 'imagem1.jpg' }
        ],
        valor_total: 200,
        endereco: { rua: 'Rua Teste' },
        cartao: { numero_cartao: '1234' }
      });
    });
  });

  describe('registrar_compra', () => {
    it('deve redirecionar para /login se o usuário não estiver logado', async () => {
      const req = { session: { login: null }, query: { compra: '[]', valor_total: 100 } };
      const res = mockRes();

      await registrar_compra(req, res);

      expect(res.redirect).toHaveBeenCalledWith('/login');
    });

    it('deve registrar a compra e exibir a tela de confirmação para o usuário logado', async () => {
      const req = { 
        session: { login: { id: 1, usuario: 'usuarioTeste', notificacao: [] } },
        query: { compra: JSON.stringify([{ produto: 'Produto1', categoria: 'Categoria1', quantidade: 2 }]), valor_total: 200 }
      };
      const res = mockRes();

      cliente.query
        .mockResolvedValueOnce({ rows: [{ id: 101, produto: 'Produto1' }] })
        .mockResolvedValueOnce();

      await registrar_compra(req, res);

      expect(req.session.login.notificacao.length).toBe(1);

      expect(res.render).toHaveBeenCalledWith('compra_finalizada', {
        title: 'Compra Finalizada',
        usuario: 'usuarioTeste',
        compra: [{ produto: 'Produto1', categoria: 'Categoria1', quantidade: 2 }],
        valor_total: 200,
        notificacao: req.session.login.notificacao,
        data: expect.any(String)
      });
    });
  });

});
