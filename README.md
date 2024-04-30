# Projeto-API-Sistema-Banco

O projeto consiste na criação de um API com sistema básico para banco digital, o qual apresenta as seguintes funcionalidades:

* Consulta das contas cadastratas;
* Criaçāo de uma nova conta;
* Atualizar dados dos usuários da conta;
* Excluir uma conta existente;
* Depositar dinheiro na conta;
* Sacar dinheiro da conta;
* Transferir dinheiro entre contas do mesmo banco;
* Consultar saldo da conta;
* Emitir extrato da conta.

# Como Executar o Projeto

1. Execute o npm install na raiz do projeto, para poder instalar as dependências do projeto;
2. Para inciar o servidor é necessário rodar o comando npm run dev no terminal;
3. Para realizar o teste das rotas utilizar o Insomnia com as rotas a seguir.

# Rotas do Servidor

// rotas que possuem os "controladores contas".
* get /contas?senha_banco=Cubos123Bank - Rota para listar todas as contas existentes, é necessario utilizar a senha do banco; 
* get /contas/extrato?numero_conta=123&senha=123 - Rota para emitir o extrato de uma determiada conta;
* get contas/saldo?numero_conta=3&senha=125 - Rota para verificar o saldo da conta;
* post /contas - Rota para criar uma nova conta;
* delete /contas/:numeroConta - Rota para deletar uma conta;
* put contas/:numeroConta/usuario - Rota para atualizar os dados do usuário de uma conta;

//rotas que possuem os "controladores transacoes".
* post transacoes/depositar - Rota utilizzada para incluir um deposito em uma conta;
* post transacoes/sacar - Rota utilizada para sacar valor de uma conta;
* post transacoes/transferir - Rota utilizada para transferir valores entre contas deste mesmo banco;
