import { useEffect, useRef, useState } from 'react'
import useContent from '../context/useContent.js'

function ContentForm() {
  const { addContent } = useContent()
  const nameInputRef = useRef(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (name === 'nome' && value.trim()) {
      setError('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.nome.trim()) {
      setError('Informe um nome para cadastrar o conteúdo.')
      return
    }

    addContent({
      nome: formData.nome.trim(),
      descricao: formData.descricao.trim(),
      imagem: formData.imagem.trim(),
    })

    setFormData({
      nome: '',
      descricao: '',
      imagem: '',
    })
    setError('')
    nameInputRef.current?.focus()
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Cadastrar conteúdo</h2>
        <p>Preencha os dados para adicionar um novo material de estudo.</p>
      </div>

      <form className="content-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Nome do conteúdo</span>
          <input
            ref={nameInputRef}
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Ex.: Resumo de React"
          />
        </label>

        <label className="field">
          <span>Descrição</span>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Anote o foco principal desse material."
          />
        </label>

        <label className="field">
          <span>Imagem URL</span>
          <input
            type="url"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.png"
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="submit">
          Salvar conteúdo
        </button>
      </form>
    </section>
  )
}

export default ContentForm
