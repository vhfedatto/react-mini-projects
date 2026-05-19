import useContent from '../context/useContent.js'
import ContentImage from './ContentImage.jsx'

function ContentList() {
  const { contents, loading, error, removeContent, clearList } = useContent()

  return (
    <section className="panel">
      <div className="section-heading section-heading--row">
        <div>
          <h2>Conteúdos cadastrados</h2>
          <p>Visualize os materiais adicionados localmente nesta sessão.</p>
        </div>

        <button
          className="secondary-button secondary-button--danger"
          type="button"
          onClick={clearList}
          disabled={contents.length === 0}
        >
          Limpar lista
        </button>
      </div>

      {loading ? (
        <div className="status-message">
          <p>Carregando conteúdos...</p>
        </div>
      ) : null}

      {error ? (
        <div className="status-message status-message--error">
          <p>Erro ao carregar conteúdos.</p>
        </div>
      ) : null}

      {contents.length > 0 ? (
        <div className="content-list">
          {contents.map((content) => (
            <article className="content-card" key={content.id}>
              <ContentImage src={content.imagem} alt={content.nome} />

              <div className="content-card__header">
                <h3>{content.nome}</h3>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => removeContent(content.id)}
                >
                  Remover
                </button>
              </div>

              <p className="content-card__description">
                {content.descricao || 'Sem descrição informada para este conteúdo.'}
              </p>
            </article>
          ))}
        </div>
      ) : !loading ? (
        <div className="empty-state">
          <p>Nenhum conteúdo cadastrado ainda.</p>
        </div>
      ) : null}
    </section>
  )
}

export default ContentList
