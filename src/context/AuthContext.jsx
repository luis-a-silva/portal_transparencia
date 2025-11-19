import { createContext, useContext, useEffect, useState } from "react";
import {
  login,
  logout as logoutService,
  handleCallback,
  getAccessToken,
  getUserInfo,
} from "../api/authService";

import { getUserByEmail } from "../api/usuario";

// -------------------------------------------------
// CRIA O CONTEXTO
// -------------------------------------------------
const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// -------------------------------------------------
// PROVIDER
// -------------------------------------------------
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Carrega dados logo após login ou refresh
  useEffect(() => {
    (async () => {
      // Trata callback do Azure (troca code → token)
      await handleCallback();

      // Obtém access token (renova se necessário)
      const accessToken = await getAccessToken();
      if (!accessToken) return;

      setToken(accessToken);

      // -------------------------------------
      // PEGA DADOS DO USUÁRIO VIA ID TOKEN
      // -------------------------------------
      const identity = getUserInfo();
      if (!identity) return;

      const email =
        identity.email ||
        identity.preferred_username ||
        identity.unique_name;

      if (!email) {
        console.error("⚠️ Não foi possível encontrar um e-mail no ID Token.");
        return;
      }

      try {
        // -------------------------------------
        // BUSCA O USUÁRIO NA SUA API
        // -------------------------------------
        const data = await getUserByEmail(email);

        setUser({
          id: data.id,
          nome: data.nome,
          email: data.email,
          role: data.role,
          setor: data.setor_Id,
        });

      } catch (err) {
        console.error("❌ Erro ao carregar usuário interno:", err);
      }
    })();
  }, []);

  // Logout total
  const logout = () => {
    logoutService();
    setToken(null);
    setUser(null);
  };

  // Retorna provider
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// -------------------------------------------------
// HOOK PARA PEGAR CONTEXTO
// -------------------------------------------------
export function useAuth() {
  return useContext(AuthContext);
}
