import { createContext, useEffect, useReducer, useState } from 'react'
import contentReducer from '../reducers/contentReducer.js'

const ContentContext = createContext(null)

function ContentProvider({ children }) {
  const [contents, dispatch] = useReducer(contentReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadContents() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/photos?_limit=5',
        )

        if (!response.ok) {
          throw new Error('Não foi possível carregar os conteúdos.')
        }

        const data = await response.json()

        if (ignore) {
          return
        }

        data.forEach((item) => {
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              id: item.id,
              nome: item.title,
              descricao: `Conteúdo importado da API pública com id ${item.id}.`,
              imagem: item.url,
            },
          })
        })
      } catch {
        if (!ignore) {
          setError('Erro ao carregar conteúdos.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadContents()

    return () => {
      ignore = true
    }
  }, [])

  function addContent(contentData) {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: crypto.randomUUID(),
        nome: contentData.nome,
        descricao: contentData.descricao,
        imagem: contentData.imagem,
      },
    })
  }

  function removeContent(contentId) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: contentId,
    })
  }

  function clearList() {
    dispatch({
      type: 'CLEAR_LIST',
      payload: null,
    })
  }

  const value = {
    contents,
    loading,
    error,
    addContent,
    removeContent,
    clearList,
  }

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export { ContentContext, ContentProvider }
