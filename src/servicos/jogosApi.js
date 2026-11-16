import { requisitar } from "./http";
import { comCapa } from "../dados/capas";

export async function listarJogos() {
  const jogos = await requisitar("/jogos");
  return jogos.map(comCapa);
}

export async function buscarJogo(id) {
  return comCapa(await requisitar(`/jogos/${id}`));
}

export async function buscarJogoPorNome(nome) {
  const jogos = await requisitar(`/jogos?nome=${encodeURIComponent(nome)}`);
  return jogos[0] || null;
}

export function criarJogo(dados) {
  return requisitar("/jogos", { method: "POST", body: JSON.stringify(dados) });
}

export function atualizarJogo(id, dados) {
  return requisitar(`/jogos/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}

export function removerJogo(id) {
  return requisitar(`/jogos/${id}`, { method: "DELETE" });
}
