import './Login.css';
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Login() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Header />
            <div className="full-width-container">
                <div className="content">
                    {!isAuthenticated ? (
                        // 🔒 Versão para usuário não logado
                        <div className="card col-md-4 mt-3 ml-3 mr-3">
                            <h5 className="card-header">
                                Você não está logado.
                            </h5>
                            <div className="card-body">
                                <div className="card-text">
                                    Use o botão na parte superior direita para logar.
                                    <br />
                                    Ao tentar acessar você será redirecionado automaticamente para a plataforma de identidade da Microsoft.
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ✅ Versão para usuário logado
                        <div className="card col-md-4 mt-3 ml-3 mr-3">
                            <img src="/card-image1.jpg" alt="Processos" className="card-img-top" />
                            <div className="card-body">
                                <h3>Portal de Monitoramento da LAI</h3>
                                <p>Acompanhe o andamento das publicações no portal de transparência do Crea-BA.</p>
                                <Link to="/home">
                                    <i className="bi bi-arrow-right"></i> Visite
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

