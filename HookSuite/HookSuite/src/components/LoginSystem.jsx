import { useEffect, useState } from "react";

const LAST_LOGIN_KEY = "hooksuite-last-login";
const AUTH_STORAGE_KEY = "hooksuite-auth-user";

function LoginSystem({ onLogin }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const ultimoLogin = localStorage.getItem(LAST_LOGIN_KEY);
    const usuarioSalvo = localStorage.getItem(AUTH_STORAGE_KEY);

    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setLogin(usuario.login);
      return;
    }

    if (ultimoLogin) {
      setLogin(ultimoLogin);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (login.trim() === "" || senha.trim() === "") {
      setErro("Informe login e senha para continuar.");
      return;
    }

    setErro("");
    onLogin({
      login: login.trim(),
      autenticadoEm: new Date().toISOString(),
    });
    setSenha("");
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <span className="question-tag">Questao 5</span>
        <h1>HookSuite</h1>
        <p className="login-subtitle">
          Acesse o painel de demonstracao dos React Hooks
        </p>

        <form className="form login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              placeholder="Digite seu login"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          {erro ? <p className="error-message">{erro}</p> : null}

          <button type="submit">Entrar no Dashboard</button>
        </form>

        <p className="login-helper">
          Autenticacao local simulada com useState, useEffect e localStorage.
        </p>
      </div>
    </section>
  );
}

export default LoginSystem;
