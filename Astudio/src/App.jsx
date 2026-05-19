import ContentForm from './components/ContentForm.jsx'
import ContentList from './components/ContentList.jsx'
import { ContentProvider } from './context/ContentContext.jsx'

function App() {
  return (
    <ContentProvider>
      <main className="app-shell">
        <section className="hero-section">
          <span className="eyebrow">Plataforma de estudos</span>
          <h1>Astudio</h1>
          <p className="hero-copy">
            Organize materiais de estudo em um único lugar e acompanhe os
            conteúdos que você quer revisar.
          </p>
        </section>

        <section className="content-grid">
          <ContentForm />
          <ContentList />
        </section>
      </main>
    </ContentProvider>
  )
}

export default App
