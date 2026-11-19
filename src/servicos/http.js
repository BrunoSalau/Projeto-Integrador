import { URL_API } from "../config/api";

let tokenAtual = null;

export function definirToken(token) {
  tokenAtual = token || null;
}

export async function requisitar(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(tokenAtual ? { Authorization: `Bearer ${tokenAtual}` } : {}),
        ...(opcoes.headers || {}),
      },
    });
  } catch (erro) {
    throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão.");
  }

  const corpo = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    const mensagem = corpo?.erro || (corpo?.erros || []).join(" ") || `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }
  return corpo;
}
