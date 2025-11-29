import api from "./api";

export async function listarClientes() {
  try {
    const r = await api.get("/clientes");
    return r.data;
  } catch (e) {
    console.log("ERRO LISTAR CLIENTES >>", e);
    throw e;
  }
}

export async function buscarCliente(id) {
  try {
    const r = await api.get(`/clientes/${id}`);
    return r.data;
  } catch (e) {
    console.log("ERRO BUSCAR CLIENTE >>", e);
    throw e;
  }
}

export async function criarCliente(cliente) {
  try {
    const r = await api.post("/clientes", cliente);
    return r.data;
  } catch (e) {
    console.log("ERRO CRIAR CLIENTE >>", e);
    throw e;
  }
}

export async function excluirCliente(id) {
  try {
    await api.delete(`/clientes/${id}`);
    return true;
  } catch (e) {
    console.log("ERRO EXCLUIR CLIENTE >>", e);
    throw e;
  }
}
