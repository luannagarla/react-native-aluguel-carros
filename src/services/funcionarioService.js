import api from "./api";

export async function listarFuncionarios() {
  try {
    const r = await api.get("/funcionarios");
    return r.data;
  } catch (e) {
    console.log("ERRO LISTAR FUNCIONARIOS >>", e);
    throw e;
  }
}

export async function buscarFuncionario(id) {
  try {
    const r = await api.get(`/funcionarios/${id}`);
    return r.data;
  } catch (e) {
    console.log("ERRO BUSCAR FUNCIONARIO >>", e);
    throw e;
  }
}

export async function criarFuncionario(funcionario) {
  try {
    const r = await api.post("/funcionarios", funcionario);
    return r.data;
  } catch (e) {
    console.log("ERRO CRIAR FUNCIONARIO >>", e);
    throw e;
  }
}

export async function excluirFuncionario(id) {
  try {
    await api.delete(`/funcionarios/${id}`);
    return true;
  } catch (e) {
    console.log("ERRO EXCLUIR FUNCIONARIO >>", e);
    throw e;
  }
}

export async function buscarFuncionarios(texto) {
  try {
    const r = await api.get(`/funcionarios/buscar?q=${texto}`);
    return r.data;
  } catch (e) {
    console.log("ERRO BUSCAR FUNCIONARIOS FILTRO >>", e);
    throw e;
  }
}

export async function atualizarFuncionario(id, data) {
  const r = await api.put(`/funcionarios/${id}`, data);
  return r.data;
}

