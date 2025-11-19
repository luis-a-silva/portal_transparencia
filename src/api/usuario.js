import axios from "axios";

const API_URL = "https://localhost:7283/api/Usuario";

const token = localStorage.getItem('idToken');

export async function getAllUsers() {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.dados;
}

export async function getUserByEmail(email) {
  try {
    const response = await axios.get(`${API_URL}/email/${email}`);
    return response.data.dados;
  } catch (error) {
    console.error("Erro ao buscar usuário por e-mail:", error.response?.data || error);
    throw error;
  }
}

export async function getUserById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.dados;
}

export async function createUser(usuario) {
  const response = await axios.post(API_URL, usuario);
  return response.data.dados;
}

export async function updateUser(id, usuario) {
  const response = await axios.put(`${API_URL}/${id}`, usuario);
  return response.data.dados;
}

export async function patchUser(id, data) {
  const response = await axios.patch(`${API_URL}/${id}/status`, data);
  return response.data.dados;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.dados;
}

