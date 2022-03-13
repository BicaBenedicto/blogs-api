# Blogs Api
Back-end criação de API de Blog, com token e validação de tokens, criação de usuário, post, categorias, utilizando o Node.js, Express, Sequelize e JWT
## Funcionalidades

### Banco de dados criados e registros

- Banco de dados para usuários registrando (nome, id, e-mail, senha, image)
- Banco de dados para categorias registrando (id, nome)
- Banco de dados para postagens do blog registrando (id, titulo, conteúdo, id do usuário, data de criação, data de update)
- Banco de dados para postagens categorias registrando (id da postagem, id da categoria)

### Rotas criadas e funções

#### Usuário /user

- /user (Aceito método post e get) | Criação de nova conta e consulta de todas contas
- /user/:id (Aceito método get) | Consulta de conta por id
- /user/me (Aceito método delete) | Exclui conta de pessoa logada e suas postagens

#### Categorias /categories

- /categories (Aceita método get e post) | Consulta todos as categorias todas as categorias e cria categoria

#### Login /login

- /login (Aceita método post) | Acessa a conta retornando token para utilização de outras funcionalidades

#### Postagem /post

- /post (Aceita método post e get) | Cria postagem nova e consulta todas as postagens
- /post/search (Aceita método get) | Consulta postagens por titulo e/ou conteúdo com itens específicos
- /post/:id (Aceita método get, put e delete) | Consulta, edita ou deleta a postagem por id
## Aprendizados

Maior prática com a estrutura de camadas ao criar API, utilizar a biblioteca do Sequelize para criação de dados dos bancos de dados e utilização da biblioteca JWT para autorização e usuários.

## Stack utilizada

**Back-end:** Node.js, Express, Sequelize, JWT


## Instalação

Instale blogs-api com o comando abaixo

```bash
  npm install blogs-api
  cd blogs-api
```

Após isso crie um arquivo `.env` para a colocação dos dados do banco de dados

```bash
    MYSQL_USER=SEU USUÁRIO
    MYSQL_PASSWORD=SUA SENHA
    HOSTNAME=SEU HOST
    JWT_SECRET=SEU SEGREDO DA CHAVE JWT
```

Agora que o arquivo está criado e com as informações corretas do banco, execute o comando abaixo para criação do banco de dados.

```bash
    npm run prestart
```

Pronto! A instalação da API está completa.
## Rodando localmente

Instale as dependências do passo a passo anterior, após isso só executar o comando abaixo

```bash
  npm run start
```

## Autores
### Gabriel

| [![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabrielpbenedicto@gmail.com) | [![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielbenedicto/) | [![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/gabrielbenedicto) |
| ------|-------|-----|
