import { requisitar } from "./http";

export function listarCategorias() {
  return requisitar("/categorias");
}

export function criarCategoria(dados) {
  return requisitar("/categorias", { method: "POST", body: JSON.stringify(dados) });
}

export function atualizarCategoria(id, dados) {
  return requisitar(`/categorias/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}

export function removerCategoria(id) {
  return requisitar(`/categorias/${id}`, { method: "DELETE" });
}
