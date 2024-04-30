let { banco, contas, saques, depositos, transferencias } = require('../bancodedados')

const validarNumContaeValor = (req, res, next) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório!' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor de depósito é obrigatório!' });
    }

    next();
}

const validarConta = (req, res, next) => {
    const { numero_conta } = req.body;

    const contaVerificar = contas.find(conta => conta.numero === numero_conta);

    if (!contaVerificar) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }

    next();
}

const verificarSenha = (req, res, next) => {
    const { numero_conta, senha } = req.body;


    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada' });
    }

    if (senha === '') {
        return res.status(401).json({ mensagem: "A senha do banco não foi informada!" })
    };


    const contaVerificar = contas.findIndex(conta => conta.numero === numero_conta);

    const senhaContaEncontrada = contas[contaVerificar].usuario.senha;

    if (senhaContaEncontrada !== senha) {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }
    next();
}

const validacoesTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'O numero da conta de origem é obrigatório!' });
    }

    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'O numero da conta de destino é obrigatório!' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor de depósito é obrigatório!' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada' });
    }

    if (senha === '') {
        return res.status(401).json({ mensagem: "A senha do banco não foi informada!" })
    };

    const contaOrigemVerificar = contas.find(conta => conta.numero === numero_conta_origem);

    if (!contaOrigemVerificar) {
        return res.status(404).json({ mensagem: 'Conta de origem não foi encontrada!' });
    }

    const contaDestinoVerificar = contas.find(conta => conta.numero === numero_conta_destino);

    if (!contaDestinoVerificar) {
        return res.status(404).json({ mensagem: 'Conta de destino não foi encontrada!' });
    }

    const contaVerificar = contas.findIndex(conta => conta.numero === numero_conta_origem);

    const senhaContaEncontrada = contas[contaVerificar].usuario.senha;

    if (senhaContaEncontrada !== senha) {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}



module.exports = {
    validarNumContaeValor,
    validarConta,
    verificarSenha,
    validacoesTransferencia,
}