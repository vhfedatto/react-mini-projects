import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function ApiMonitor() {
  const [dados, setDados] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [statusRequisicao, setStatusRequisicao] = useState("Aguardando");
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function buscarDados() {
      try {
        setCarregando(true);
        setErro("");
        setStatusRequisicao("Carregando");

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
          throw new Error("Falha ao carregar os dados da API.");
        }

        const dadosRecebidos = await resposta.json();

        if (!ativo) {
          return;
        }

        setDados(dadosRecebidos);
        setStatusRequisicao("Concluida");
        setUltimaAtualizacao(new Date().toLocaleString("pt-BR"));
      } catch (error) {
        if (!ativo) {
          return;
        }

        setErro(error.message || "Erro inesperado ao consultar a API.");
        setStatusRequisicao("Erro");
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    buscarDados();

    return () => {
      ativo = false;
    };
  }, [reloadToken]);

  const dadosFiltrados = dados.filter((usuario) => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return true;
    }

    return (
      usuario.name.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo)
    );
  });

  return (
    <section className="card api-dashboard">
      <div className="card-header">
        <span className="question-tag">Questao 6</span>
        <h2>Monitoramento de Requisicoes HTTP</h2>
        <p>
          Consulta uma API publica com <strong>useEffect</strong> e{" "}
          <strong>fetch</strong>, controlando carregamento, erro, recarga e
          filtros sem renderizacoes infinitas.
        </p>
      </div>

      <div className="api-toolbar">
        <div className="form-group">
          <label htmlFor="busca-api">Buscar por nome ou e-mail</label>
          <input
            id="busca-api"
            type="text"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Ex: Leanne ou @biz"
          />
        </div>

        <div className="api-actions">
          <button type="button" onClick={() => setReloadToken((valor) => valor + 1)}>
            Recarregar dados
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => setBusca("")}
          >
            Limpar busca
          </button>
        </div>
      </div>

      <div className="api-status-grid">
        <div className="status-card">
          <span>Status</span>
          <strong>{statusRequisicao}</strong>
        </div>
        <div className="status-card">
          <span>Total carregado</span>
          <strong>{dados.length}</strong>
        </div>
        <div className="status-card">
          <span>Resultado filtrado</span>
          <strong>{dadosFiltrados.length}</strong>
        </div>
        <div className="status-card">
          <span>Ultima atualizacao</span>
          <strong>{ultimaAtualizacao || "Ainda nao atualizada"}</strong>
        </div>
      </div>

      <div className="result-box">
        {carregando ? <p className="loading">Carregando dados da API...</p> : null}
        {erro ? <p className="error-message">Erro: {erro}</p> : null}

        {!carregando && !erro && (
          <ul className="api-list">
            {dadosFiltrados.map((usuario) => (
              <li key={usuario.id}>
                <div className="section-heading">
                  <strong>{usuario.name}</strong>
                  <span>{usuario.address.city}</span>
                </div>
                <span>{usuario.email}</span>
                <small>{usuario.company.name}</small>
              </li>
            ))}
          </ul>
        )}

        {!carregando && !erro && dadosFiltrados.length === 0 ? (
          <p className="empty">Nenhum usuario encontrado para a busca informada.</p>
        ) : null}
      </div>
    </section>
  );
}

export default ApiMonitor;
