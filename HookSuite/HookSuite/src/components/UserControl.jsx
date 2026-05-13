import { useState } from "react";

function UserControl() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");

  function adicionarUsuario(event) {
    event.preventDefault();

    if (nome.trim() === "" || email.trim() === "" || cargo.trim() === "") {
      setErro("Preencha nome, e-mail e cargo antes de cadastrar.");
      return;
    }

    setErro("");

    const novoUsuario = {
      id: Date.now(),
      nome: nome.trim(),
      email: email.trim(),
      cargo: cargo.trim(),
    };

    setUsuarios((usuariosAtuais) => [...usuariosAtuais, novoUsuario]);
    setNome("");
    setEmail("");
    setCargo("");
  }

  return (
    <section className="card">
      <div className="card-header">
        <span className="question-tag">Questao 4</span>
        <h2>Sistema de Controle de Usuarios</h2>
        <p>
          Cadastro local com <strong>useState</strong> para controlar os inputs,
          validar os campos e exibir usuarios dinamicamente.
        </p>
      </div>

      <form className="form stacked-form" onSubmit={adicionarUsuario}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Harvey Specter"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Ex: harvey@specter.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cargo">Cargo</label>
          <input
            id="cargo"
            type="text"
            value={cargo}
            onChange={(event) => setCargo(event.target.value)}
            placeholder="Ex: Advogado Senior"
          />
        </div>

        {erro ? <p className="error-message">{erro}</p> : null}

        <button type="submit">Cadastrar usuario</button>
      </form>

      <div className="result-box">
        <div className="section-heading">
          <h3>Usuarios cadastrados</h3>
          <span>{usuarios.length} registro(s)</span>
        </div>

        {usuarios.length === 0 ? (
          <p className="empty">Nenhum usuario cadastrado ainda.</p>
        ) : (
          <ul className="user-list">
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                <strong>{usuario.nome}</strong>
                <span>{usuario.email}</span>
                <small>{usuario.cargo}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default UserControl;
