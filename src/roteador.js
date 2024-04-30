const express = require('express');
const { validaSenha, validarDados, validarCpfExistente, validarEmailExistente, validarNumeroConta, verificarNumcontaeSenhaExtrato, } = require('./intermediarios/intermediarios-contas');
const { listarContas, cadastrarConta, excluirConta, atualizarDadosUsuarios, obterExtrato, obterSaldoConta } = require('./controladores/contas');
const { validarNumContaeValor, validarConta, verificarSenha, validacoesTransferencia, } = require('./intermediarios/intermediarios-transacoes')
const { novoDeposito, novoSaque, novaTransferencia, } = require('./controladores/transacoes');



const rotas = express();

//rotas controladores contas.
rotas.get('/contas', validaSenha, listarContas);
rotas.get('/contas/extrato', verificarNumcontaeSenhaExtrato, obterExtrato)
rotas.get('/contas/saldo', verificarNumcontaeSenhaExtrato, obterSaldoConta);
rotas.post('/contas', validarDados, validarCpfExistente, validarEmailExistente, cadastrarConta);
rotas.delete('/contas/:numeroConta', validarNumeroConta, excluirConta);
rotas.put('/contas/:numeroConta/usuario', validarDados, validarNumeroConta, atualizarDadosUsuarios);

//rotas controladores transacoes.
rotas.post('/transacoes/depositar', validarNumContaeValor, validarConta, novoDeposito);
rotas.post('/transacoes/sacar', validarNumContaeValor, validarConta, verificarSenha, novoSaque);
rotas.post('/transacoes/transferir', validacoesTransferencia, novaTransferencia);


module.exports = rotas; 