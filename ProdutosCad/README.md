# ProdutosCad

Projeto simples de cadastro e gerenciamento de produtos, desenvolvido em React, com integração a uma API local usando `json-server`.

Desenvolvido por Victor H Fedatto  

## Sobre o projeto

Esta aplicação simula um pequeno painel de e-commerce para gerenciar produtos de uma vitrine digital.

Funcionalidades atuais:

- listar produtos vindos da API
- cadastrar, editar, excluir e ver produtos
- validar formulário antes do envio
- tratar erros de requisição

## Tecnologias utilizadas

- React
- Vite
- CSS
- Fetch API
- JSON Server

## Como executar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto React:

```bash
npm run dev
```

3. Em outro terminal, inicie a API local com o `json-server`:

```bash
npx json-server db.json
```

Se necessário, confirme se a API está rodando em:

```txt
http://localhost:3000/products
```

## Estrutura principal

- `src/App.jsx`: lógica da aplicação e interface principal
- `src/App.css`: estilos do componente principal
- `src/index.css`: estilos globais
- `db.json`: base de dados local usada pela API
