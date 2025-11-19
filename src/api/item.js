import axios from "axios";

const API_URL = "https://localhost:7283/api/Item";

export async function getAllItems() {
  const response = await axios.get(API_URL);
  return response.data.dados; // 👈 porque sua API retorna ResponseModel
}

export async function getItemById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.dados;
}

// 🔹 Busca itens por setor
export async function getItemsBySetor(setorId) {
  const response = await axios.get(`${API_URL}/setor/${setorId}`);
  return response.data.dados; // retorna apenas os dados
}

export async function createItem(item) {
  const response = await axios.post(API_URL, item);
  return response.data.dados;
}

export async function updateItem(id, item) {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data.dados;
}

export async function patchItem(id, status) {
  const response = await axios.patch(`${API_URL}/${id}/status`, status);
  return response.data.dados;
}

export async function deleteItem(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.dados;
}

export async function updateItemStatusLog(id, status_Id, email, nome) {
  const body = { status_Id, email, nome };
  console.log("Id da tarefa:"+ id +" Body enviado para API:", body);
  const response = await axios.patch(`${API_URL}/${id}/status-log`, body);
  return response.data;
}
