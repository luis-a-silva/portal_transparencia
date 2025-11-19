import axios from "axios";

const API_URL = "https://localhost:7283/api/Categoria";

export async function getAllCategorias() {
  const response = await axios.get(`${API_URL}/dto`);
  return response.data.dados;
}

export async function getCategoriaById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data?.dados ?? response.data;
}

export async function createCategoria(item) {
  const response = await axios.post(API_URL, item);
  return response.data.dados;
}

export async function updateCategoria(id, item) {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data.dados;
}

export async function deleteCategoria(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.dados;
}

