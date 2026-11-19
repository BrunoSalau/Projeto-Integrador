import { requisitar } from "./http";

export function listarAvaliacoes(jogoId) {
  const filtro = jogoId === undefined ? "" : `?jogoId=${jogoId}`;
  return requisitar(`/avaliacoes${filtro}`);
}

export function criarAvaliacao(dados) {
  return requisitar("/avaliacoes", { method: "POST", body: JSON.stringify(dados) });
}

export function atualizarAvaliacao(id, dados) {
  return requisitar(`/avaliacoes/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}

export function removerAvaliacao(id) {
  return requisitar(`/avaliacoes/${id}`, { method: "DELETE" });
}
