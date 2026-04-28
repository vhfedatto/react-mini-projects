import { useState } from 'react'
import styles from './Carro.module.css'
import logoVolkswagen from '../assets/logo-volkswagen.svg'
import logoAudi from '../assets/logo-audi.svg'
import logoRenault from '../assets/logo-renault.svg'

function Carro({ nome, cor, ano, preco, marca, combustivel, cambio }) {
  const [modalAberto, setModalAberto] = useState(false)

  const ehCaro = preco > 100000
  const classePreco = ehCaro ? styles.carroCaro : styles.carroBarato
  const logosPorMarca = {
    Volkswagen: logoVolkswagen,
    Audi: logoAudi,
    Renault: logoRenault,
  }
  const logoMarca = logosPorMarca[marca]

  return (
    <>
      <div
        className={`${styles.carroCard} ${classePreco}`}
        style={{
          '--cor-destaque': cor,
        }}
      >
        {logoMarca && (
          <img
            src={logoMarca}
            alt={`Logo da marca ${marca}`}
            className={styles.logoMarca}
          />
        )}

        <div className={styles.topoCard}>
          <span className={styles.badge}>
            {ehCaro ? 'Premium' : 'Acessível'}
          </span>
          <span className={styles.ano}>{ano}</span>
        </div>

        <div className={styles.conteudo}>
          <h2 className={styles.nome}>{nome}</h2>

          <div className={styles.linha}></div>

          <p className={styles.preco}>
            R$ {preco.toLocaleString('pt-BR')}
          </p>

          <p className={styles.categoria}>
            {ehCaro ? 'Carro caro' : 'Carro barato'}
          </p>

          <button
            className={styles.botaoDetalhes}
            onClick={() => setModalAberto(true)}
          >
            Ver detalhes
          </button>
        </div>
      </div>

      {modalAberto && (
        <div className={styles.overlay} onClick={() => setModalAberto(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitulo}>{nome}</h3>

            <div className={styles.modalInfo}>
              <p><strong>Marca:</strong> {marca}</p>
              <p><strong>Combustível:</strong> {combustivel}</p>
              <p><strong>Câmbio:</strong> {cambio}</p>
            </div>

            <button
              className={styles.botaoFechar}
              onClick={() => setModalAberto(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Carro
