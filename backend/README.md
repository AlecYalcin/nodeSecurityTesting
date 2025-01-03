# Versão Fail

Essa versão está segmentada para ter falhas de código. Essas falhas podem ser exploradas de acordo com o arquivo ./README.md.

## Modelos de Banco de Dados

### Usuários

São os clientes e administradores do sistema. Responsáveis por acessar o conteúdo cadastrado ou realizar compras. Administradores podem criar, alterar e deletar livros da API, tendo uma permissão especial para tal.

- id: `number`
- name: `string`
- email: `string`
- password: `string`
- isAdmin: `boolean`

### Livros

São os produtos da aplicação. Abstração dos livros da vida real. Podem ser cadastrados, alterados, pesquisados ou excluídos por administradores do sistema.

- id: `number`
- title: `string`
- author: `string`
- description: `string`
- price: `number`
- stock: `number`
- img: `string`

### Pagamentos

Resultados de compras de usuários na API. Identificam o que foi comprado, quem comprou e quanto comprou além do preço final.

- id: `number`
- user_id: `number`
- book_id: `number`
- quantity: `number`
- total_price: `number`

## Autorização

A autorização das rotas é feita por meio de Tokens JWT. Algumas rotas pedem por tokens em sua composição. Os tokens diferenciam usuários comuns de administradores e ainda retornam dados sobre esses usuários.

## Rotas da API

### users

#### `POST users`

> Authorization Required

Rota de criação de usuários. Recebe no corpo da requisição _name, email, password, isAdmin_. Meio de criação direto de outros administradores no sistema. Restrito a administradores.

#### `GET users/:id`

> Authorization Required

Rota de busca por id de usuários. Recebe como parâmetro da requisição o id do usuário e retorna um usuário existente nesse id. Para usuários comuns, só pode retornar as informações dele próprio. Para usuários administradores, retorna a informação de qualquer usuário.

#### `GET users/search`

> Authorization Required

Rota de busca generalizada de usuários. Recebe como query _name, email_ e retorna os resultados mais próximos dessa query. Restrito a administradores.

#### `PATCH users/:id`

> Authorization Required

Rota de atualização de usuários. Recebe no corpo da requisição os atributos a serem alterados (_name, email, passowrd_) e nos parâmetros o id do usuário a ser modificado. Usuários comuns só podem alterar suas próprias contas, enquanto administradores podem alterar qualquer conta.

#### `DELETE users/:id`

> Authorization Required

Rota de exclusão de usuários. Recebe como parâmetro da requisição o id do usuário e exclui um usuário existente nesse id. Usuários comuns só podem alterar sua próprias contas enquanto administradores podem alterar qualquer conta.

### books

#### `POST books`

> Authorization Required

Rota de criação de livros. Recebe no corpo da requisição _author, title, description, img, price, stock_. Só pode ser acessada por administradores.

#### `GET books/:id`

Rota de busca por id de livros. Recebe como parâmetro da requisição o id do livro e retorna um livro existente nesse id.

#### `GET books/search`

Rota de busca generalizada de livros. Recebe como query _author, title, price, stock_ e retorna os resultados mais próximos dessa query.

#### `PATCH books/:id`

> Authorization Required

Rota de atualização de livros. Recebe no corpo da requisição os atributos a serem alterados (_author,title,description, img, price, stock_) e nos parâmetros os id do livro a ser modificado. Só pode ser acessada por administradores.

#### `DELETE books/:id`

> Authorization Required

Rota de exclusão de livros. Recebe como parâmetro da requisição o id do livro e exclui um livro existente nesse id. Só pode ser acessada por adiministradores.

### payments

#### POST payments/create

> Authorization Required

Rota para criação de novos pagamentos. Recebe no corpo da requisição _user-id, book-id, quantity_. Verifica se o usuário existe, se o livro existe, se o usuário tem a quantidade de dinheiro necessária e se existe essa quantidade de livros em estoque. Usuários comuns só podem realizar transferências para eles mesmos. Adiministradores podem realizar compras para qualquer usuário.

#### GET payments/list

> Authorization Required

Rota para a listagem de pagamentos. Recebe como query _user-id, book-id, total, date_ e retorna os resultados mais próximos dessa query. Usuários comuns só podem retornar seus próprios pagamentos. Administradores podem retornar qualquer pagamento.

#### DELETE payments/:id

> Authorization Required

Rota para apagar pagamentos. Recebe como parâmetro um id do pagamento e excluí um pagamento existente nesse id. Usuários comuns só podem apagar seus próprios pagamentos. Administradores podem apagar qualquer pagamento.

#### POST payments/transfer

> Authorization Required

Rota para transferência bancária. Recebe no corpo da requisição _user-id, target-id, total_ e faz uma transferência bancária dessas quantidades, reduzindo os valores do usuário original e transferindo o adicional para o usuário destino, caso se tenha o suficiente. Usuários comuns só podem transferir de suas contas a qualquer outra. Administradores podem realizar qualquer tipo de transferência com contas.

### auth

#### `POST auth/login`

Rota para a autenticação de usuários. Recebe no corpo da requisição _email e password_ e procura uma conta existente nesses termos. Retorna um token de acesso para ser utilizado em outras rotas e com um tempo de expiração de 48h.

#### `POST auth/register`

Rota para a criação e autenticação de usuários comuns. Recebe no corpo da requisição _name, email, password_ e cria uma conta caso já não exista uma conta com mesmo email. Retorna um token de acesso para ser utilizado em outras rotas e com um tempo de expiração de 48h.
