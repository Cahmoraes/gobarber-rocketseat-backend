<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h3 align="center">
  Back-end GoBarber
</h3>

---

## :rocket: Sobre

O GoBarber é uma aplicação desenvolvida durante o bootcamp da [Rocketseat](https://rocketseat.com.br/).

## :computer: Tecnologias utilizadas

- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [typescript](https://www.typescriptlang.org/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [uuidv4](https://www.npmjs.com/package/uuidv4)
- [jest](https://jestjs.io/docs/en/getting-started.html)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [handlebars](https://handlebarsjs.com/)
- [redis](https://redis.io/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://nodemailer.com/about/)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [typeorm](https://typeorm.io/#/)

## :warning: Pré-requisitos

- [git](https://git-scm.com/)
- [insomnia](https://insomnia.rest/)
- [docker](https://www.docker.com/)

## :information_source: Instruções para rodar o projeto

Primeiramente é necessário criar os bancos de dados para conseguir utilizar a aplicação, você pode fazer isso usando o docker, desta forma:

```bash
# Criando postgres
$ docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Você pode usar outros nomes e credenciais para os bancos, lembre-se sempre de conferir isso aqui :point_right: [arquivo de configuração do typeorm](https://github.com/gdlopes/gobarber-backend/blob/master/ormconfig.json) e nas [variáveis de ambiente](https://github.com/gdlopes/gobarber-backend/blob/master/.env.example).

:warning: Aqui está disponível um aquivo chamado `.env.example` é necessário criar uma cópia deste arquivo, porém com o nome `.env` para as variáveis de ambiente funcionarem.

Feito isso, podemos seguir.

:warning: Lembre-se também de deixar rodando todas imagens do docker.

```bash
# Clonando o repositório
$ git clone https://github.com/gdlopes/gobarber-backend.git

# Navegando para a pasta do projeto
$ cd gobarber-backend

# Instalando as dependências
$ yarn

# Rodando as migrations
$ yarn typeorm migration:run

# Rodando a aplicação
$ yarn dev:server
```
