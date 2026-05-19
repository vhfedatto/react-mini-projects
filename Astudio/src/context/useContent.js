import { useContext } from 'react'
import { ContentContext } from './ContentContext.jsx'

function useContent() {
  const context = useContext(ContentContext)

  if (!context) {
    throw new Error('useContent deve ser usado dentro de ContentProvider.')
  }

  return context
}

export default useContent
