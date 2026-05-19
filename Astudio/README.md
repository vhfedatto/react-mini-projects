# Astudio

Astudio é uma mini aplicação web para cadastro e visualização de conteúdos de estudo. O projeto foi desenvolvido com React sobre o Vite e evoluiu em versões pequenas, cada uma introduzindo um conceito importante do ecossistema React.

## Objetivo educacional

O foco da aplicação é servir como exercício prático para estudar organização de componentes, formulários controlados, gerenciamento global de estado, reducer, consumo de API, manipulação de refs e tratamento de imagens no front-end.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- Context API
- `useReducer`
- `useEffect`
- `useRef`
- CSS puro

## Estrutura de pastas

```text
src/
  components/
    ContentForm.jsx
    ContentImage.jsx
    ContentList.jsx
  constants/
    images.js
  context/
    ContentContext.jsx
    useContent.js
  reducers/
    contentReducer.js
  App.jsx
  global.css
  main.jsx
public/
  fallback-content.svg
VERSIONS.md
README.md
```

## Funcionalidades implementadas

- Cadastro manual de conteúdos com nome, descrição e URL da imagem
- Validação de nome obrigatório no formulário
- Foco automático no campo de nome com `useRef`
- Listagem dinâmica com `map`
- Remoção individual de itens com `filter`
- Limpeza completa da lista com reducer
- Estado global compartilhado com Context API
- Gerenciamento centralizado da lista com `useReducer`
- Carregamento inicial de conteúdos externos com `useEffect` e `fetch`
- Estados de carregamento e erro para a requisição
- Exibição de imagens com fallback automático em caso de erro
- Interface responsiva com CSS puro

## Conceitos React usados

### `useState`

Usado no formulário para controlar os campos digitados pelo usuário e a mensagem de validação.

### `useRef`

Usado para acessar o input de nome e aplicar foco automático sem consultar o DOM manualmente.

### `Context API`

Usada para compartilhar a lista de conteúdos e as ações principais entre formulário e listagem.

### `useReducer`

Usado para centralizar as transições de estado da lista por meio das ações `ADD_ITEM`, `REMOVE_ITEM` e `CLEAR_LIST`.

### `useEffect`

Usado para carregar conteúdos externos ao iniciar a aplicação.

### `fetch`

Usado para consumir dados da API pública e adaptar os itens ao formato interno do projeto.

## Fluxo da aplicação

1. A aplicação é iniciada pelo `App.jsx`, que envolve a interface com `ContentProvider`.
2. O `ContentProvider` cria o estado global com `useReducer`.
3. Ao carregar, o contexto busca dados externos com `useEffect` e envia esses dados ao reducer.
4. O `ContentForm` envia novos conteúdos para o contexto por meio da função `addContent`.
5. O `ContentList` lê a lista global e renderiza os cards dinamicamente.
6. A remoção individual usa `removeContent`, e a limpeza total usa `clearList`.
7. Cada imagem é renderizada por `ContentImage`, que aplica uma imagem fallback quando necessário.

## Como instalar e rodar

```bash
npm install
npm run dev
```

Depois disso, abra a URL mostrada pelo Vite no navegador.

## Resumo das versões

- `v0.1`: estrutura inicial com componentes e estilo base
- `v0.2`: cadastro local com `useState`
- `v0.3`: renderização da lista com `map` e remoção com `filter`
- `v0.4`: compartilhamento da lista com Context API
- `v0.5`: refatoração do estado global para `useReducer`
- `v0.6`: consumo de API com `useEffect` e `fetch`
- `v0.7`: foco automático no campo de nome com `useRef`
- `v0.8`: fallback de imagem com `onError`
- `v0.9`: melhoria visual e responsividade com CSS puro
- `v1.0`: revisão final e consolidação da documentação

## Observações finais

O projeto foi mantido propositalmente simples e legível, com foco em explicar bem cada conceito. A arquitetura evita bibliotecas extras e prioriza separação clara entre interface, estado global, reducer e documentação.
