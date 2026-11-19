import { requisitar, definirToken } from "./http";

export async function entrar(email, senha) {
  const resposta = await requisitar("/usuarios/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  definirToken(resposta.token);
  return resposta;
}

export async function cadastrar(nome, email, senha) {
  const resposta = await requisitar("/usuarios/cadastro", {
    method: "POST",
    body: JSON.stringify({ nome, email, senha }),
  });
  definirToken(resposta.token);
  return resposta;
}

export function sair() {
  definirToken(null);
}
