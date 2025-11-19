import './Header.css';
import { useAuth } from "../../context/AuthContext";

export default function Header() {
    const { isAuthenticated, user, login, logout } = useAuth();

  return (
    <>
      <header className="header">
        <img src="/public/logo-iris.png" alt="Logo" />
      </header>

      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href="/">IRIS</a>
        <span className="navbar-text">
          Sistema Inteligente de Integração de Recursos
        </span>

        <div className="btn-group ml-auto dropleft">
          <ul className="nav navbar-nav navbar-right">
            {!isAuthenticated ? (
              // Navbar quando não está autenticado
              <li>
                <button className="btn btn-success" onClick={login}>
                  Entrar
                </button>
              </li>
            ) : (
              // Navbar quando está autenticado
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Olá, {user?.nome}!
                  </span>
                </li>
                <li>
                  <button className="btn btn-warning" onClick={logout}>
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
