import { requisitar } from "./http";
import { comCapa } from "../dados/capas";

export async function listarNoticias() {
  const noticias = await requisitar("/noticias?ordem=desc");
  return noticias.map(comCapa);
}

export async function buscarNoticia(id) {
  return comCapa(await requisitar(`/noticias/${id}`));
}

export function criarNoticia(dados) {
  return requisitar("/noticias", { method: "POST", body: JSON.stringify(dados) });
}

export function atualizarNoticia(id, dados) {
  return requisitar(`/noticias/${id}`, { method: "PUT", body: JSON.stringify(dados) });
}

export function removerNoticia(id) {
  return requisitar(`/noticias/${id}`, { method: "DELETE" });
}
