import { URL_API } from "../config/api";

export async function requisitar(caminho, opcoes) {
  let resposta;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, {
      headers: { "Content-Type": "application/json" },
      ...opcoes,
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
