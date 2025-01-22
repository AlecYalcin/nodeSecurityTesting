# Versão Fail

Essa versão está segmentada para ter falhas de código. Essas falhas podem ser exploradas de acordo com o arquivo ./README.md.

## Sobre o Frontend

Essa aplicação foi desenvolvida com Node.js em conjunto com React e Bootstrap v5.3. Tem como objetivo representar um página de E-commerce padrão.

## Rotas da Aplicação

### auth

#### /login

Página de autenticação de usuário cadastrados no sistema. Conta com `email` e `password` para serem preenchidos.

#### /register

Página de criação de usuários no sistema. Conta `name`, `email` e `password` para a criação de contas.

### business

#### `/`

Página principal da aplicação. Conta com três Carousels diferentes que ordenam livros em preço, quantidade e data de criaçãos. Todos os livros redirecionam para suas respectivas páginas na rota `/book/:id`.

#### `/payment/transfer`

Página de transferência bancária. Responsável por realizar troca de dinheiro entre usuário no sistema. Sendo possível identificar um usuário destino e uma quantidade bancária.

#### `/payment/search`

Página de pesquisa para pagamentos. Restrito a administradores. É possível pesquisar o id de algum pagamento ou retornar todos os existentes.

### library

#### /book/:id

Página de visualização de livro. Aqui é possível visualizar as características do livros, tais como `title`,`author`,`stock` e `price`. Além disso é possível realizar compras do livro identificando a quantidade que se quer (menor ou igual ao estoque) e se tem dinheiro disponível. Para administradores, uma opção de edição ou exclusão de livros se apresenta na parte superior da página, redirecionando para `book/:id/edit`.

#### /book/:id/edit

Página de edição de livros. Restrito a administradores. É possível modificar as características do livro tais como `title` e/ou `author` e/ou `stock` e/ou `price`.

#### /book/create

Página de criação de livros. Restrito a administradores. É possível criar um novo livro no sistema.

#### /book/search

Página de busca de livros. Pesquisa de livros por nome, aparecem todo os resultados que se encaixam no nome da pesquisa.

### profile

#### /profile/:id

Página de visualização do usuário. Onde é possível ver `name`,`email` e `bank`. Além disso, conta com botões de acesso para as rotas `profile/:id/edit`,`profile/:id/history` e também `payment/transfer`

#### /profile/:id/edit

Página de edição do perfil de usuário. Responsável por atualizar `name` e/ou `email` e/ou `bank`.

#### /profile/:id/history

Página com o histórico de compras do usuário. Aqui são filtrados todos os pagamentos realizados pelo usuário que estão salvos no sistema.

#### /profile/search

Página de pesquisa de usuários. Restrito a administradores, é possível pesquisar pelos nomes de usuários presentes no sistema.
