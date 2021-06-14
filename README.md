<div align="center">
  <img src="https://raw.githubusercontent.com/augustoost/assets/main/as.png" alt="SignUp" title="SignUp" />
  
   <h3 align="center"> 
	  CustomerX challenge
   </h3>

   <a href="https://www.linkedin.com/in/augusto-ostapechen/">
      <img alt="Made by Augusto Ostapechen" src="https://img.shields.io/badge/made%20by-Augusto Ostapechen-%2304D361">
   </a>
   
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   </p>

</div>

---

## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/#/)
- [Swagger](https://swagger.io/)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Axios](https://www.npmjs.com/package/axios)
- [Styled-components](https://styled-components.com/)
- [Yup](https://www.npmjs.com/package/yup)

## Projeto Overview

> <p style="margin-left:5em"> &nbsp;&nbsp;&nbsp;&nbsp;./packages/API - API REST usando NodeJS com TypeScript, Express e Docker compose </p>
> <p style="margin-left:5em"> &nbsp;&nbsp;&nbsp;&nbsp;./packages/web - Interface web em ReactJS e TypeScript </p>

---

## Instalações e usos

Clone ou faça o downlod desse repositório:

```
# Clone
$ git clone https://github.com/augustoost/customerXChallenge.git
```

Acesse a pasta API:

```
$ cd API/

# Instale as dependências
$ yarn

# Faça o build utilizando o Docker compose
$ sudo docker-compose build

# Inicie o projeto.
$ sudo docker-compose up

# Rode as migrations em outro terminal para criar o banco de dados
$ yarn typeorm migration:run

🚀 Server is running! 🚀

~ running on port 3333
```

Iniciando a aplicação WEB:

```
# Acesse a pasta web
$ cd /packages/web/

# Instale as dependencias
$ yarn

# Rode
$ yarn start

# running on localhost:3000
```

---

## Documentação

Com o server rodando, acesse a página http://localhost:3333/api-docs/

ou se preferir
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=CustomerXChallenge&uri=https%3A%2F%2Fraw.githubusercontent.com%2Faugustoost%2Fassets%2Fmain%2FCustomerXChallenger.json)
