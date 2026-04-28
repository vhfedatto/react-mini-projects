import Carro from './components/Carro'
import './index.css'

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="tag">Garagem React</p>
        <h1>Catálogo moderno de veículos</h1>
        <p className="subtitle"> Um projeto em React com componentes, props, lógica condicional, classes dinâmicas e CSS Modules, agora com uma interface mais moderna.</p>
      </section>

      <section className="lista-carros">
        <Carro
          nome="Tiguan"
          cor="#c3c9d4"
          ano={2021}
          preco={165000}
          marca="Volkswagen"
          combustivel="Gasolina"
          cambio="Automático"/>

        <Carro
          nome="Audi A5"
          cor="#060b16"
          ano={2022}
          preco={320000}
          marca="Audi"
          combustivel="Gasolina"
          cambio="Automático"
        />

        <Carro
          nome="Kwid"
          cor="#b76c3b"
          ano={2023}
          preco={75000}
          marca="Renault"
          combustivel="Flex"
          cambio="Manual"
        />
      </section>

      <footer className="footer">
        <div className="footerConteudo">
          <p className="footerNome">Victor Hugo Fedatto Vasconcelos</p>

          <div className="footerLinks">
            <a
              className="footerBotao"
              href="https://github.com/vhfedatto"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <button className="footerBotao footerBotaoDesativado" type="button">
              LinkedIn
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
