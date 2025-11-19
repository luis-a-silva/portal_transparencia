import './Navbar.css';
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <>
            <header className="header">
                <img src="/public/logo-iris.png" alt="Logo" />
            </header>

            <nav className="navbar navbar-expand-md navbar-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                Matriz
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/kanban">
                                Kanban
                            </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink4" role="button" data-toggle="dropdown" aria-expanded="false">
                                Administração
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                <li><Link className="dropdown-item" to="/admin/user">Usuários</Link></li>
                                <li><Link className="dropdown-item" to="/admin/setor">Setores</Link></li>
                                <li><Link className="dropdown-item" to="/admin/categorias">Categorias</Link></li>
                                <li><Link className="dropdown-item" to="/admin/dashboard">Dashboard</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <>
                    <span className="nav-link">
                        Olá, {(user as any)?.nome}! <br />
                    </span>
                    <button className="btn btn-warning" onClick={logout}>
                        Sair
                    </button>
                </>
            </nav>
        </>
    );
}
