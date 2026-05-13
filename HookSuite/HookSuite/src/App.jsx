import { useEffect, useState } from "react";
import LoginSystem from "./components/LoginSystem";
import UserControl from "./components/UserControl";
import ApiMonitor from "./components/ApiMonitor";

const STORAGE_KEY = "hooksuite-auth-user";

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
  const [carregandoSessao, setCarregandoSessao] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem(STORAGE_KEY);

    if (usuarioSalvo) {
      setUsuarioAutenticado(JSON.parse(usuarioSalvo));
    }

    setCarregandoSessao(false);
  }, []);

  function handleLogin(usuario) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
    localStorage.setItem("hooksuite-last-login", usuario.login);
    setUsuarioAutenticado(usuario);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setUsuarioAutenticado(null);
  }

  if (carregandoSessao) {
    return <div className="app loading-screen">Carregando sessao...</div>;
  }

  if (!usuarioAutenticado) {
    return (
      <div className="app">
        <LoginSystem onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-brand">HookSuite</p>
            <h1>Painel Administrativo</h1>
            <p className="dashboard-subtitle">
              Login ativo como <strong>{usuarioAutenticado.login}</strong>.
            </p>
          </div>

          <div className="dashboard-actions">
            <p>Ola, {usuarioAutenticado.login}</p>
            <button type="button" className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-grid">
          <div className="dashboard-column">
            <UserControl />
          </div>

          <div className="dashboard-column">
            <ApiMonitor />
          </div>
        </main>
      </div>

      <footer className="footer">
        <p>&copy; 2026 Victor Hugo Fedatto. Todos os direitos reservados.</p>
        <a
          href="https://github.com/vhfedatto"
          target="_blank"
          rel="noreferrer"
        >
          GitHub: vhfedatto
        </a>
      </footer>
    </div>
  );
}

export default App;
