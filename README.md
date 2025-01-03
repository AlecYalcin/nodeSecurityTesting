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

### Sequelize

Framework ORM utilizado para se criar uma conexão com o banco de dados que permite a utilização de queries inline. Dessa forma é possível testar as falhas anteriormente citadas de maneira direta.

### SQLite

Banco de dados da aplicação. Responsável pela execução das funções que retornam usuários, objetos, e informações importantes.

## Execução da Aplicação

W.I.P

### Instalação de Recursos

W.I.P

### Lógica de Negócios

W.I.P

## Testagem de Erros

W.I.P
