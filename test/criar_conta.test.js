import { describe, it, expect, vi } from 'vitest';
import { salvar_conta, gerarSenhaHash } from '../controller/criar_conta_controller.js';
import cliente from '../config/database.js';


const mockReq = {
  body: {
    usuario_nome: 'testuser',
    email: 'test@example.com',
    senha1: 'password123',
    senha2: 'password123',
  },
};

const mockRes = {
  render: vi.fn(),
};

describe('salvar_conta', () => {
  it('deve criar uma nova conta com senhas iguais', async () => {
    vi.spyOn(cliente, 'query').mockResolvedValueOnce(true);
    await salvar_conta(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalledWith('conta_criada', { usuario: 'testuser' });
    vi.restoreAllMocks();
  });

  it('deve exibir um erro quando as senhas não conferem', async () => {
    const mockReqWithDiffPasswords = {
      ...mockReq,
      body: {
        ...mockReq.body,
        senha2: 'differentpassword',
      },
    };

    await salvar_conta(mockReqWithDiffPasswords, mockRes);
    expect(mockRes.render).toHaveBeenCalledWith('criar_conta', {
      title: 'Criar Conta',
      erro: 'Senhas não conferem Tente Novamente!',
    });
  });

  it('deve exibir um erro quando o usuário já existe', async () => {
    vi.spyOn(cliente, 'query').mockRejectedValueOnce(
      'error: duplicar valor da chave viola a restrição de unicidade "usuario_nome_key"'
    );

    await salvar_conta(mockReq, mockRes);
    expect(mockRes.render).toHaveBeenCalledWith('criar_conta', {
      title: 'Criar Conta',
      erro: 'Usuário existente use outro nome!',
    });
    vi.restoreAllMocks();
  });
});

describe('gerarSenhaHash', () => {
  it('deve gerar um hash de senha', async () => {
    const hash = await gerarSenhaHash('password123');
    expect(hash).not.toBe('password123');
  });
});