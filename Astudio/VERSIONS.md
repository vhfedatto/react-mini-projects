# Astudio - Histórico de Versões

## Alunos:
- Kaliel Arthur Amblard Selhorst
- Victor Hugo Fedatto Vasconcelos

Ciências da Computação / P4 / Front-end Avançado / Tarde


## v0.1 - Estrutura básica

Objetivo da versão:
Criar a estrutura inicial da aplicação React e separar a interface em componentes simples.

Arquivos principais alterados/criados:
- `src/App.jsx`
- `src/main.jsx`
- `src/components/ContentForm.jsx`
- `src/components/ContentList.jsx`
- `src/global.css`

Conceitos de React usados:
- Componentes funcionais
- Composição de componentes
- Renderização da interface com `ReactDOM`

Resumo do que foi implementado:
Foi montada a base da Astudio com título, subtítulo, área de formulário, área de listagem e um estilo inicial para organizar a tela.

## v0.2 - Cadastro com useState

Objetivo da versão:
Permitir o cadastro local de conteúdos de estudo usando estado no React.

Arquivos principais alterados/criados:
- `src/App.jsx`
- `src/components/ContentForm.jsx`
- `src/components/ContentList.jsx`

Conceitos de React usados:
- `useState`
- Inputs controlados
- Eventos de formulário

Resumo do que foi implementado:
O formulário passou a controlar os campos de nome, descrição e imagem URL. Ao enviar, o sistema valida o nome e cria um objeto de conteúdo para ser exibido na lista.

## v0.3 - Manipulação de lista com arrays

Objetivo da versão:
Exibir a lista de conteúdos dinamicamente e permitir a remoção de itens.

Arquivos principais alterados/criados:
- `src/components/ContentList.jsx`
- `src/global.css`

Conceitos de React usados:
- Renderização com `map`
- Atualização de arrays no estado
- Remoção de itens com `filter`
- Uso de `key` única em listas

Resumo do que foi implementado:
Cada conteúdo passou a ser mostrado em um card com imagem, nome e descrição. Também foi adicionado um botão para remover um item específico da lista, e uma mensagem de estado vazio quando não houver conteúdos cadastrados.

## v0.4 - Context API

Objetivo da versão:
Centralizar a lista de conteúdos e as funções principais em um contexto global.

Arquivos principais alterados/criados:
- `src/context/ContentContext.jsx`
- `src/context/useContent.js`
- `src/App.jsx`
- `src/components/ContentForm.jsx`
- `src/components/ContentList.jsx`

Conceitos de React usados:
- `createContext`
- `useContext`
- Provider
- Compartilhamento de estado entre componentes

Resumo do que foi implementado:
Foi criado um contexto para armazenar a lista de conteúdos, a função de adicionar e a função de remover. O formulário passou a adicionar itens pelo contexto e a listagem passou a consumir os dados globais, sem depender diretamente do estado no `App.jsx`.

## v0.5 - useReducer

Objetivo da versão:
Refatorar o gerenciamento global da lista para usar `useReducer` junto com a Context API.

Arquivos principais alterados/criados:
- `src/reducers/contentReducer.js`
- `src/context/ContentContext.jsx`
- `src/components/ContentList.jsx`

Conceitos de React usados:
- `useReducer`
- Context API
- `dispatch`
- `action.type` e `action.payload`

Resumo do que foi implementado:
Foi criado um reducer para controlar as ações de adicionar, remover e limpar a lista. O contexto passou a usar esse reducer como base do estado global e a listagem ganhou um botão para apagar todos os conteúdos de uma vez.

## v0.6 - Consumo de API

Objetivo da versão:
Buscar conteúdos externos ao carregar a aplicação e integrar esses dados com a lista já existente.

Arquivos principais alterados/criados:
- `src/context/ContentContext.jsx`
- `src/components/ContentList.jsx`
- `VERSIONS.md`

Conceitos de React usados:
- `useEffect`
- `fetch`
- Estados de carregamento e erro
- Integração de dados externos com reducer

Resumo do que foi implementado:
Ao iniciar a aplicação, o contexto faz uma requisição para uma API pública, adapta os dados para o formato da Astudio e envia cada item para o reducer. Os conteúdos importados convivem com os cadastrados manualmente, e a interface mostra mensagens de carregamento e erro quando necessário.

## v0.7 - useRef

Objetivo da versão:
Melhorar a interação com o formulário usando `useRef` para controlar o foco no campo de nome.

Arquivos principais alterados/criados:
- `src/components/ContentForm.jsx`

Conceitos de React usados:
- `useRef`
- `useEffect`
- Inputs controlados com `useState`

Resumo do que foi implementado:
O campo de nome passou a receber foco automaticamente ao carregar a aplicação e também depois que um novo conteúdo é cadastrado. Isso foi feito sem acessar o DOM com `querySelector` ou `getElementById`.

## v0.8 - Imagens e fallback de erro

Objetivo da versão:
Garantir que todos os cards exibam uma imagem válida, mesmo quando a URL informada falhar.

Arquivos principais alterados/criados:
- `src/components/ContentImage.jsx`
- `src/components/ContentList.jsx`
- `src/constants/images.js`
- `public/fallback-content.svg`

Conceitos de React usados:
- Componentização
- Props
- Evento `onError`

Resumo do que foi implementado:
Foi criado um componente de imagem que usa uma imagem fallback padrão sempre que a URL original não existir ou falhar. O tratamento evita loop infinito removendo o próprio `onError` antes de aplicar a imagem de reserva.

## v0.9 - CSS global e melhoria visual

Objetivo da versão:
Refinar a apresentação visual da aplicação com CSS puro, mantendo o projeto leve e organizado.

Arquivos principais alterados/criados:
- `src/global.css`

Conceitos de React usados:
- Organização por classes reutilizáveis
- Separação entre estrutura em JSX e apresentação em CSS

Resumo do que foi implementado:
A interface recebeu melhorias de espaçamento, tipografia, responsividade, sombras, botões, estados de carregamento, mensagens de erro e cards. O resultado ficou mais moderno e adequado para demonstração acadêmica.

## v1.0 - Revisão final

Objetivo da versão:
Conferir a organização geral do projeto, consolidar a documentação e preparar a versão final da aplicação.

Arquivos principais alterados/criados:
- `README.md`
- `VERSIONS.md`

Conceitos de React usados:
- Revisão de arquitetura com componentes
- Documentação técnica do fluxo da aplicação

Resumo do que foi implementado:
Foi feita uma revisão geral para confirmar o uso de `useState`, `map`, `filter`, Context API, `useReducer`, `useEffect`, `fetch`, `useRef` e fallback de imagens. Também foi criado um README final com descrição do projeto, estrutura de pastas, funcionalidades e resumo das versões.
