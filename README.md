# DEVinBank - Conta 365

Projeto desenvolvido com o objetivo de praticar o desenvolvimento de API, aos
moldes de uma conta bancária. Esse projeto é parte do segundo módulo do programa
DEVinHouse, que engloba desenvolvimento de APIs com Node.js e Express, porém não
toca banco de dados.

## Utilização

### Clonar este repositório dentro de uma pasta local, acessa-lá após o clone

`git clone https://github.com/zipluciano/DEVinBank.git`

`cd DEVinBank`

### Instalar as dependências com

`yarn install`

ou

`npm install`

### Rodar a API localmente

`yarn start`

Com algumas das ferramentas como Postman, Insomnia ou cURL, é possível testar
cada endpoint

## Endpoints

### Usuários

#### Criação de usuário

`/api/user` com método POST, bastando enviar como payload da requisição o objeto
JSON

```
{
    "name": "John Doe",
    "e-mail": john.doe@email.com
}
```

#### Atualização de usuário

`/api/user/{id}` com método PATCH, bastando enviar como payload da requisição o
objeto JSON

```
{
    "name": "John Doe",
    "e-mail": john.doe@email.com
}
```

Onde o objeto são as novas informaçãoes do usuário e o parâmetro `id` no path é
o id do usuário desejado

#### Informações do usuário

`/api/user/{id}` com método GET, onde o `id` é o id do usuário com que se deseja
saber as informações. Retorna um objeto JSON, com a forma

```
{
    "id": 42,
    "name": "John Doe",
    "e-mail": john.doe@email.com
}
```

### Financeiro

#### Criar dado financeiro

`api/finance/{id}` com método POST, onde o `id` é o id do usuário que se deseja
inserir informações financeiras. As informações são enviadas como um arquivo de
planilhas com a estensão xlsx, no corpo da requisição.

O arquivo deve ter a seguinte estrutura:

<table>
<thead>
<td>
price
</td>
<td>
typeOfExpenses
</td>
<td>
date
</td>
<td>
name
</td>
</thead>
<tbody>
<tr>
<td>
42
</td>
<td>
food
</td>
<td>
23/01/2022
</td>
<td>
Random food App
</td>
</tr>
<tr>
<td>
5
</td>
<td>
health
</td>
<td>
24/01/2022
</td>
<td>
Soap
</td>
</tr>
</tbody>
</table>

Onde a coluna typeOfExpenses só pode receber algum dos seguintes dados:

- food
- home
- health
- taxes

#### Remoção de dados financeiros do usuário

`/api/finance/{userId}/{id}` com método DELETE, onde o `userId` é o id do
usuário com que se deseja remover um dado financeiro, e o `id` é o id da
transação financeira que deseja-se remover.
