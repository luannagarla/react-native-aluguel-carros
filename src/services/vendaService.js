import api from "./api";

export async function listarVendas() {
  try {
    const r = await api.get("/vendas");
    return r.data;
  } catch (e) {
    console.log("ERRO LISTAR VENDAS >>", e);
    throw e;
  }
}

export async function buscarVenda(id) {
  try {
    const r = await api.get(`/vendas/${id}`);
    return r.data;
  } catch (e) {
    console.log("ERRO BUSCAR VENDA >>", e);
    throw e;
  }
}

export async function criarVenda(venda) {
  try {
    const r = await api.post("/vendas", venda);
    return r.data;
  } catch (e) {
    console.log("ERRO CRIAR VENDA >>", e);
    throw e;
  }
}

export async function excluirVenda(id) {
  try {
    await api.delete(`/vendas/${id}`);
    return true;
  } catch (e) {
    console.log("ERRO EXCLUIR VENDA >>", e);
    throw e;
  }
}

export async function buscarVendas(texto) {
  try {
    const r = await api.get(`/vendas/buscar?q=${texto}`);
    return r.data;
  } catch (e) {
    console.log("ERRO BUSCAR VENDAS >>", e);
    throw e;
  }
}
