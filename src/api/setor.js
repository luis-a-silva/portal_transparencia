import axios from "axios";

const API_URL = "https://localhost:7283/api/Setor";

export async function getAllSetores() {
  const response = await axios.get(API_URL);
  return response.data.dados; // 👈 porque sua API retorna ResponseModel
}

export async function getSetorDto() {
   const response = await axios.get(`${API_URL}/dto`);
  return response.data.dados; // 👈 porque sua API retorna ResponseModel
}

export async function createSetor(item) {
  const response = await axios.post(API_URL, item);
  return response.data.dados;
}

export async function updateSetor(id, item) {
  const response = await axios.put(`${API_URL}/${id}`, item);
  return response.data.dados;
}

export async function patchSetor(id, data) {
  const response = await axios.patch(`${API_URL}/${id}/status`, data);
  return response.data.dados;
}

export async function deleteSetor(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data.dados;
}
