// src/services/authService.ts
const CONFIG = {
  clientId: "a9d996f0-0460-4707-92f3-753372e57dbc",
  tenantId: "9476a667-1a5a-4cbd-8571-a0e5080b330d",
  redirectUri: window.location.origin + "/login"
};

// Gera PKCE
async function gerarPKCE() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);

  const codeVerifier = btoa(String.fromCharCode(...array))
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 64);

  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  return { codeVerifier, codeChallenge };
}

// Inicia login
export async function login() {
    console.log("Login chamado!");

  const { codeVerifier, codeChallenge } = await gerarPKCE();
  sessionStorage.setItem("pkceVerifier", codeVerifier);

  const authUrl =
    `https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/authorize?` +
    `client_id=${CONFIG.clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(CONFIG.redirectUri)}` +
    `&response_mode=query` +
    `&scope=${encodeURIComponent("openid profile email offline_access")}` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  window.location.href = authUrl;
}

// Troca code por tokens
export async function trocarCodigoPorToken(code) {
  const codeVerifier = sessionStorage.getItem("pkceVerifier");

  const params = new URLSearchParams();
  params.append("client_id", CONFIG.clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", CONFIG.redirectUri);
  params.append("code_verifier", codeVerifier || "");

  const response = await fetch(`https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await response.json();
  if (data.error) {
    console.error("Erro ao trocar código por token:", data);
    return null;
  }

  salvarTokens(data);
  return data;
}

// Renova access token
export async function renovarToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const params = new URLSearchParams();
  params.append("client_id", CONFIG.clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  params.append("redirect_uri", CONFIG.redirectUri);

  const response = await fetch(`https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await response.json();
  if (data.error) {
    console.error("Erro ao renovar token:", data);
    return null;
  }

  salvarTokens(data);
  return data.access_token;
}

// Sempre retorna token válido
export async function getAccessToken() {
  const expiresAt = parseInt(localStorage.getItem("expiresAt") || "0");
  const now = Date.now();

  if (now < expiresAt - 60000) {
    return localStorage.getItem("accessToken");
  }
  return await renovarToken();
}

// Logout
export function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href =
    `https://login.microsoftonline.com/${CONFIG.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(CONFIG.redirectUri)}`;
}

// Salva tokens
function salvarTokens(data) {
  localStorage.setItem("accessToken", data.access_token);
  localStorage.setItem("refreshToken", data.refresh_token);
  localStorage.setItem("idToken", data.id_token);
  localStorage.setItem("expiresAt", (Date.now() + data.expires_in * 1000).toString());
}

// Callback após login
export async function handleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    await trocarCodigoPorToken(code);
    window.history.replaceState({}, document.title, CONFIG.redirectUri);
  }
}

// Função para decodificar JWT
function decodeJwt(token) {
  const payload = token.split(".")[1];
  const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(decoded);
}

export function getUserInfo() {
  const idToken = localStorage.getItem("idToken");
  if (!idToken) return null;
  return decodeJwt(idToken);
}
