let { banco, contas, saques, depositos, transferencias } = require('../bancodedados')

const validaSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (senha_banco === '') {
        return res.status(401).json({ mensagem: "A senha do banco não foi informada!" })
    };


    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" })
    }
    next();
}

const validarDados = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || nome === ' ') {
        return res.status(400).json({ mensagem: 'O nome deve ser informado' });
    }

    if (!cpf|| cpf === ' ') {
        return res.status(400).json({ mensagem: 'O CPF deve ser informado' });
    }

    if (!data_nascimento || data_nascimento === ' ') {
        return res.status(400).json({ mensagem: 'A data de nascimento deve ser informado' });
    }

    if (!telefone || telefone === ' ') {
        return res.status(400).json({ mensagem: 'O telefone deve ser informado' });
    }

    if (!email || email === ' ') {
        return res.status(400).json({ mensagem: 'O e-mail deve ser informado' });
    }

    if (!senha || senha === ' ' ) {
        return res.status(400).json({ mensagem: 'A senha deve ser informado' });
    }
    next();
}

const validarCpfExistente = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfEncontrar = contas.some(conta => conta.usuario.cpf === cpf)

    if (cpfEncontrar) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
    }

    next();
}


const validarEmailExistente = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const emailEncontrar = contas.some(conta => conta.usuario.email === email);

    if (emailEncontrar) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o e-mail informado!' });
    }

    next();
}


const validarNumeroConta = (req, res, next) => {
    const { numeroConta } = req.params;

    const contaEncontrada = contas.some(conta => conta.numero === numeroConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }


    next();
}

const verificarNumcontaeSenhaExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || numero_conta === ' ') {
        return res.status(400).json({ mensagem: 'O numero da conta deve ser informado' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada' });
    }

    if (senha === '') {
        return res.status(401).json({ mensagem: "A senha do banco não foi informada!" })
    };

    const verificarConta = contas.some(conta => conta.numero === numero_conta)

    if (!verificarConta) {
        return res.status(404).json({ mensagem: "A conta informada é inválida!" })
    }

    const contaVerificar = contas.findIndex(conta => conta.numero === numero_conta);

    const senhaContaEncontrada = contas[contaVerificar].usuario.senha;

    if (senhaContaEncontrada !== senha) {
        return res.status(400).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}



module.exports = {
    validaSenha,
    validarDados,
    validarCpfExistente,
    validarEmailExistente,
    validarNumeroConta,
    verificarNumcontaeSenhaExtrato,
}
