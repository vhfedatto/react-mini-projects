import { useEffect, useState } from "react";
import "./App.css";

const URL_PRODUTOS = "http://localhost:3000/products";
const REGEX_PRECO = /^\d*([,.]\d*)?$/;

function App() {
  // Guarda o nome digitado.
  const [nome, setNome] = useState("");

  // Guarda o preço digitado.
  const [preco, setPreco] = useState("");

  // Guarda os produtos carregados da API.
  const [produtos, setProdutos] = useState([]);

  // Controla o carregamento inicial da tela.
  const [carregando, setCarregando] = useState(true);

  // Guarda mensagens de erro das requisições e validações.
  const [erro, setErro] = useState("");

  // Guarda o id do produto que está em edição.
  const [idEmEdicao, setIdEmEdicao] = useState(null);

  // Limpa os campos do formulário e encerra a edição.
  const limparFormulario = () => {
    setNome("");
    setPreco("");
    setIdEmEdicao(null);
  };

  // Troca vírgula por ponto antes de salvar o preço.
  const normalizarPreco = (valor) => valor.replace(",", ".");

  // Valida os campos antes de enviar para a API.
  const validarFormulario = () => {
    if (!nome.trim()) {
      setErro("Digite o nome do produto.");
      return false;
    }

    if (!preco) {
      setErro("Digite o preço do produto.");
      return false;
    }

    if (Number(normalizarPreco(preco)) <= 0) {
      setErro("Digite um preço válido.");
      return false;
    }

    return true;
  };

  useEffect(() => {
    // Busca os produtos da API ao carregar a página.
    const buscarProdutos = async () => {
      try {
        setCarregando(true);
        setErro("");

        const resposta = await fetch(URL_PRODUTOS);

        if (!resposta.ok) {
          throw new Error("Erro ao buscar produtos.");
        }

        const dados = await resposta.json();
        setProdutos(dados);
      } catch {
        setErro("Não foi possível carregar os produtos.");
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, []);

  const aoAlterarPreco = (evento) => {
    // Permite digitar apenas números, vírgula e ponto.
    const valor = evento.target.value;

    if (REGEX_PRECO.test(valor)) {
      setPreco(valor);
    }
  };

  const aoEnviarFormulario = async (evento) => {
    // Cadastra um produto novo ou salva uma edição.
    evento.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setErro("");

      const produtoParaSalvar = {
        name: nome.trim(),
        price: normalizarPreco(preco),
      };

      const resposta = await fetch(
        idEmEdicao ? `${URL_PRODUTOS}/${idEmEdicao}` : URL_PRODUTOS,
        {
          method: idEmEdicao ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(produtoParaSalvar),
        },
      );

      if (!resposta.ok) {
        throw new Error("Erro ao salvar produto.");
      }

      const produtoSalvo = await resposta.json();

      if (idEmEdicao) {
        setProdutos((listaAtual) =>
          listaAtual.map((produto) =>
            produto.id === idEmEdicao ? produtoSalvo : produto,
          ),
        );
      } else {
        setProdutos((listaAtual) => [produtoSalvo, ...listaAtual]);
      }

      limparFormulario();
    } catch {
      setErro(
        idEmEdicao
          ? "Não foi possível editar o produto."
          : "Não foi possível cadastrar o produto.",
      );
    }
  };

  const aoExcluirProduto = async (id) => {
    // Exclui o produto da API e atualiza a lista.
    try {
      setErro("");

      const resposta = await fetch(`${URL_PRODUTOS}/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir produto.");
      }

      setProdutos((listaAtual) =>
        listaAtual.filter((produto) => produto.id !== id),
      );

      if (idEmEdicao === id) {
        limparFormulario();
      }
    } catch {
      setErro("Não foi possível excluir o produto.");
    }
  };

  const aoEditarProduto = (produto) => {
    // Carrega os dados do produto no formulário.
    setNome(produto.name);
    setPreco(String(produto.price).replace(".", ","));
    setIdEmEdicao(produto.id);
    setErro("");
  };

  const rotuloTotal =
    produtos.length === 1
      ? "1 item no catálogo"
      : `${produtos.length} itens no catálogo`;

  const tituloFormulario = idEmEdicao ? "Atualizar item" : "Novo item";
  const descricaoFormulario = idEmEdicao
    ? "Revise as informações do produto e salve as alterações."
    : "Preencha os dados do produto para adicionar ao catálogo.";
  const textoBotao = idEmEdicao ? "Salvar alterações" : "Adicionar ao catálogo";

  return (
    <main className="app-container">
      <section className="destaque">
        <div className="destaque__conteudo">
          <span className="sobretitulo">Painel da Loja</span>
          <h1>Gestão de Catálogo</h1>
          <p>
            Gerencie os produtos da sua vitrine digital, atualize preços e mantenha
            o catálogo da loja sempre pronto para venda.
          </p>

          <div className="destaque__estatisticas">
            <div className="cartao-estatistica">
              <span className="cartao-estatistica__rotulo">Operação</span>
              <strong>Catálogo conectado</strong>
            </div>

            <div className="cartao-estatistica">
              <span className="cartao-estatistica__rotulo">Estoque digital</span>
              <strong>{rotuloTotal}</strong>
            </div>
          </div>
        </div>

        <form className="formulario-produto" onSubmit={aoEnviarFormulario}>
          <div className="formulario-produto__cabecalho">
            <span className="formulario-produto__selo">Cadastro</span>
            <h2>{tituloFormulario}</h2>
            <p>{descricaoFormulario}</p>
          </div>

          <label className="campo">
            <span>Nome do produto</span>
            <input
              type="text"
              placeholder="Ex.: Tênis casual urbano"
              value={nome}
              onChange={(evento) => setNome(evento.target.value)}
            />
          </label>

          <label className="campo">
            <span>Preço de venda</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Ex.: 199,90"
              value={preco}
              onChange={aoAlterarPreco}
            />
          </label>

          <button className="botao-enviar" type="submit">
            {textoBotao}
          </button>
        </form>
      </section>

      <section className="secao-catalogo">
        <div className="secao-catalogo__cabecalho">
          <div>
            <span className="sobretitulo">Catálogo</span>
            <h2>Produtos da vitrine</h2>
          </div>

          <p>{rotuloTotal}</p>
        </div>

        {erro && <div className="mensagem-retorno mensagem-retorno--erro">{erro}</div>}

        {carregando ? (
          <div className="estado-vazio">
            <h3>Carregando catálogo...</h3>
            <p>Aguarde enquanto os produtos da loja são sincronizados.</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="estado-vazio">
            <h3>Sua vitrine ainda está vazia</h3>
            <p>Cadastre o primeiro produto para começar a montar o catálogo.</p>
          </div>
        ) : (
          <div className="grade-produtos">
            {produtos.map((produto) => (
              <article className="cartao-produto" key={produto.id}>
                <div className="cartao-produto__conteudo">
                  <span className="cartao-produto__tag">Item da loja</span>
                  <h3>{produto.name}</h3>
                  <strong>R$ {produto.price}</strong>
                </div>

                <div className="cartao-produto__acoes">
                  <button
                    className="botao-editar"
                    type="button"
                    onClick={() => aoEditarProduto(produto)}
                  >
                    Atualizar
                  </button>

                  <button
                    className="botao-excluir"
                    type="button"
                    onClick={() => aoExcluirProduto(produto.id)}
                  >
                    Excluir
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
