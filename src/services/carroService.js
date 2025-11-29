import api from "./api";

export async function listarCarros() {
  const r = await api.get("/carros");
  return r.data;
}

export async function buscarCarro(id) {
  const r = await api.get(`/carros/${id}`);
  return r.data;
}

export async function criarCarro(dados) {
  try {
    const r = await api.post("/carros", dados);
    return r.data;
  } catch (e) {
    throw e; 
  }
}

export async function atualizarCarro(id, carro) {
  const r = await api.put(`/carros/${id}`, carro);
  return r.data;
}

export async function excluirCarro(id) {
  await api.delete(`/carros/${id}`);
}
