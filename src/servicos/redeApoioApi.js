import { requisitar } from "./http";

export function listarContatosApoio() {
  return requisitar("/rede-apoio");
}

export function criarContatoApoio(dados) {
  return requisitar("/rede-apoio", { method: "POST", body: JSON.stringify(dados) });
}

export function atualizarContatoApoio(id, dados) {
  return requisitar(`/rede-apoio/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}

export function removerContatoApoio(id) {
  return requisitar(`/rede-apoio/${id}`, { method: "DELETE" });
}
