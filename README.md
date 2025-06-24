# Zoppy Fullstack Jr Test

Este repositório contém a solução do desafio técnico júnior da **Zoppy**.

## 🛠 Tecnologias Utilizadas

- **Frontend**: Angular
- **Backend**: NestJS
- **Banco de dados**: PostgreSQL
- **Containerização**: Docker

---

## 🐳 Docker

Para rodar a aplicação em docker sera necessário.

---

## 🚀 Como rodar o projeto

### 1. Instale as dependências

Navegue até os diretórios `frontend/zoppy-test` e `backend/zoppy-test` e execute o comando abaixo em cada um:

```bash
npm install
```

### 2. Configure o banco de dados

A aplicação backend utiliza PostgreSQL. Para que o NestJS possa se conectar ao banco, edite o arquivo:

backend/zoppy-test/src/app.module.ts

Altere os seguintes campos com as credenciais do seu banco local:

```ts
username: 'SEU_USUARIO'
password: 'SUA_SENHA'
port: 5432 // ou outra porta, caso tenha alterado
database: 'NOME_DO_BANCO' // o banco deve ser criado previamente
```

### 3. Inicie os servidores

Execute os comandos abaixo em dois terminais separados:
Backend (NestJS)

```bash
cd backend/zoppy-test/
npm start
```

Frontend (Angular)

```bash
cd frontend/zoppy-test/
npm start
```
