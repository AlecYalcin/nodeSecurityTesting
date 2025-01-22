# Node.js Security Testing

Esse repositório é direcionado a testagem de segurança em Node.js através da exploração de falhas. O repositório é dividido em duas `branchs` que são nomeadas de `fail` e `safe`. Cada uma dessas branchs tem um propósito distinto, sendo a **fail** reservada para o sistema com as falhas de segurança e a **safe** com as medidas de proteção a estas falhas inclusas. O repositório busca explorar três principais formas de erro em desenvolvimento web descrito nas seções a seguir.

## Sobre o Software

A aplicação desenvolvida nesse repositório é uma livraria virtual. Com a capacidade de se ter clientes (usuários comuns) e administradores (usuários com permissões) ela se estabelece como E-commerce imbutido. Clientes compram livros e essas compras são registradas, onde os administradores podem ver esse histórico de compras e adicionar, modificar ou excluir livros. Contando com um sistema de autenticação utilizando tokens e sessão. E um sistema monetário implícito para fins de teste.

Essas características foram escolhidas para a implementação das falhas de segurança. Sendo parte importante desse processo a lógica de negócios. Um E-commerce com admins fornece uma representação de como funcionam as principais aplicações dos dias de hoje (2024). E a exploração da falha de um sistema como esse para fins didáticos pode ensinar muito sobre segurança digital.

## Falha de Segurança Exploradas

### SQL Injection

Através da inserção de Querys maliciosas no banco de dados sem proteção, esse tipo de erro pode acarretar na devolução de informações não permitidas, alteração ou exclusão de informações, e acesso irrestrito a capacidades do sistema.

### Buffer Overflow

Utilizando-se do princípio de limite de buffer, esse tipo de ataque explora a quantidade de memória que uma estrutura de dados pode suportar e o quanto o excesso desses elementos nessa estrutura pode afetar essa memória. Pode ser causada para acessar partes não autorizadas do sistema ou tomar controle da máquina que hospeda a aplicação.

### Cross Site Request Forgery (CSRF)

Com a criação de _hyperlinks_ hostis, um hacker pode fazer, sem consentimento, um usuário executar funções do sistema que não deveria. Esse tipo de ataque acontece em sistemas que dispoẽm-se de APIs ou requisições para acesso a lógica do sistema, podendo fazer com que um usuário múltiplos níveis de acesso libere de forma indiscrimanada o acesso para o hacker ou que execute funções impróprias de maneira a afetar o funcionamento da aplicação.

## Sobre o Sistema

Informações sobre todas as ferramentas, bibliotecas e pacotes utilizadas para a criação da aplicação. Explicação sobre o motivo da escolha de cada uma das partes do sistema e como elas convergem com o objetivo desse projeto.

### Node.js

Framework de desenvolvimento web amplamente utilizada no mercado atual (2024). Sendo referência para desenvolvimento de aplicações de maneira rápida, fácil e escalável. Portanto, um ponto chave de análise. Além disso, por sua alta costumização, é capaz de ter inúmeras falhas dependendo apenas do programador e dos pacotes escolhidos.

### Express

Biblioteca HTTP bastante conhecida e utilizada no meio de desenvolvimento web com javascript, Express permite a criação de APIs de maneira fácil. Sendo utilizada para criar as requisições do sistema assim como as páginas.

### React.js

Biblioteca CSS para estilização. Utilizada somente para fins visuais e gráficos, não há nenhum erro que essa biblioteca proporcione que esse projeto busque explorar.

### MySQL

Banco de dados da aplicação. Responsável pela execução das funções que retornam usuários, objetos, e informações importantes.

## Execução da Aplicação

Toda a aplicação é dockerizada e pronta para ser utilizada em qualquer máquina que suporte o docker. Sendo assim, é possível executar o `docker-compose.yaml`, mas antes é preciso realizar uma configuração na pasta ./backend.

Acesse .env.example da pasta backend e altere `DB_NAME` e `SECRET_KEY` para os respectivos nomes que desejas. `DB_NAME` se refere a tabela no banco de dados que a aplicação irá conectar (geralmente definida no docker-compose.yaml) e `SECRET_KEY` se refere a uma chave secreta de geração de JWT (A maneira como acontece a autorização no sistema). Após isso, renameie o arquivo para .env e só rodar:

- `$ docker-compose up --build`

Caso não seja possível realizar a dockerização dos componentes siga os seguintes passos. (Ainda tendo em vista a dockerização de, pelo menos, o banco de dados)

1. Desative 'backend' e 'frontend' do docker-compose.yaml
2. Acesse a pasta './backend' e altere o .env, altere `DB_HOST` e `DB_PORT` para 'localhost' e '3336' respectivamente.
3. Realize a instalação dos packkotes do packasge.json em ambas as pastas com o comando `npm install`
4. Rode, na pasta './backend', o comando `npm run dev` e terá acesso ao servidor na porta 3000.
5. Rode, na pasta './frontend', o comando `npm run dev` e terá acesso ao servidor na porta 4000.

### Instalação de Recursos

Para executar a aplicação, a máquina do usuário deve ter alguns recursos. Quando em ambiente dockerizado, esses passos a seguir não são necessários.

- node ^20.15.1
- npm ^10.7.0

Para instalar os pacotes de cada interface (frontend e/ou backend) é necessário entrar nas respectivas pastas e rodar o comando `npm install`. Os pacotes que podem ser encontrados nessa instalação são:

#### Backend

    "@types/express": "^5.0.0",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^22.10.2",
    "nodemon": "^3.1.9",
    "ts-node": "^10.9.2",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.7.2"
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.12.0"

#### Frontend

    "bootstrap": "^5.3.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.4.0",
    "react-router-dom": "^7.1.1"
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5"

Algumas dessas dependências são somente de servidor. Como a aplicação é um estudo fechado e não tem intenções de ser lançada em produção, não é necessário uma diferenciação entre os pacotes.

Além disso, é necessário rodar com o docker a imagem do MySQL. Se por algum motivo o docker não utilizar a imagem correta do MySQL, siga esses passos:

1. docker pull mysql:8

Então, o docker vai baixar autometicamente a imagme.

### Lógica de Negócios

Para que a aplicação siga modelos reais de E-commerce presentes no mercado, uma lógica interna de negócios é essencial para se entender como funciona todo o processamento de informações e como isso reflete na empresa real. Nesse software, a aplicação é separada em quatro partes: Autenticação, Negócios, Livraria e Perfis.

#### Autenticação

Segue os modelos padrões de mercado com um tipo de autenticação JWT. A autorização é reservada a certos usuários com maiores permissões no sistema (os admins).

#### Negócios

A paginação dos negócios é baseada em duas partes: Compra de Livros e Transferência Bancária. A compra livros gera pagamentos que ficam salvos no sistema, alteram a quantidade bancária de usuários e o estoque de livros. Além dos pagamentos serem temporais, ou seja, representam o prçeo naquele período de tempo (Pois os livros podem sofrer alterações de preço). A transferência bancária reflete o ato de emprestar dinheiro a uma conta diferente, alterando ambos os usuários do sistema, mas não deixa rastros do ocorrido.

#### Livraria

Todo o CRUD de Livros. Que incui a criação, pesquisa, alteração, exclusão e leitura dos dados salvos no banco de dados. Algumas funções são restritas a administradores do sistema.

#### Perfis

Todo o CRUD de Usuários. Que inclui a criação, pesquisa, alteração, exclusão e leitura dos dados salvos no banco de dados. A maioria das funções são restristas a administradores do sistema.
