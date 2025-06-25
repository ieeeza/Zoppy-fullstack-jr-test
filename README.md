# 🚀 Zoppy Fullstack Jr Test

Este repositório contém a solução do desafio técnico júnior da **Zoppy**.

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** Angular
- **Backend:** NestJS
- **Banco de Dados:** PostgreSQL
- **Containerização:** Docker

---

## 🐳 Docker

Para rodar a aplicação com Docker, é necessário ter o Docker instalado em sua máquina e configurar previamente o banco de dados.

Na raiz do projeto, execute:

```bash
docker-compose up -d --build
```

Este comando irá construir e iniciar os containers automaticamente.

---

## 🚀 Como Rodar o Projeto Localmente

### 1️⃣ Instale as Dependências

Navegue até os diretórios `frontend/zoppy-test` e `backend/zoppy-test` e instale as dependências com:

```bash
npm install
```

### 2️⃣ Configure o Banco de Dados

A aplicação backend utiliza **PostgreSQL**. Para que o NestJS possa se conectar ao banco, edite o arquivo abaixo:

```ts
// backend/zoppy-test/src/app.module.ts
```

Atualize os campos com suas credenciais locais:

```ts
username: 'SEU_USUARIO',
password: 'SUA_SENHA',
port: 5432, // ou outra porta, caso tenha alterado
database: 'NOME_DO_BANCO' // o banco deve ser criado previamente
```

### 3️⃣ Inicie os Servidores

Abra dois terminais para rodar o frontend e o backend separadamente:

#### Backend (NestJS)

```bash
cd backend/zoppy-test/
npm start
```

#### Frontend (Angular)

```bash
cd frontend/zoppy-test/
npm start
```

---

## ✅ Pronto!

A aplicação estará rodando nos seguintes endereços (por padrão):

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## 📦 Estrutura do Projeto

```bash
zoppy-fullstack-jr-test/
├── backend/
│   └── zoppy-test/
├── frontend/
│   └── zoppy-test/
├── docker-compose.yml
└── README.md
```

---

## 📌 Observações

- Certifique-se de que o banco de dados PostgreSQL esteja rodando e acessível.
- O banco de dados deve ser criado manualmente antes de iniciar o backend.

---

## 💬 Contato

Caso tenha dúvidas ou sugestões, fique à vontade para entrar em contato.

---

Feito com 💻 por ieza :)
