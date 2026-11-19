const { criarRotasCrud } = require("../crud");
const { somenteAdmin } = require("../autenticacao");

const esquema = `
CREATE TABLE IF NOT EXISTS noticias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  resumo TEXT NOT NULL DEFAULT '',
  categoria TEXT NOT NULL DEFAULT '',
  data TEXT NOT NULL DEFAULT '',
  capa TEXT NOT NULL DEFAULT '',
  texto TEXT NOT NULL
);
`;

const iniciais = [
  [
    "Nebula Rift ganha data de lançamento",
    "O aguardado jogo de tiro espacial chega em novembro com beta aberto no mês anterior.",
    "Lançamentos",
    "18/10/2026",
    "capa-1",
    "A desenvolvedora confirmou que Nebula Rift chega em 12 de novembro. O beta aberto acontece duas semanas antes e traz três mapas cooperativos.\n\nO jogo terá campanha para até quatro jogadores e suporte a partidas entre plataformas.",
  ],
  [
    "Kingdom of Ash mostra novo trailer",
    "Vídeo de seis minutos apresenta classes, combate e o sistema de reinos.",
    "RPG",
    "16/10/2026",
    "capa-4",
    "O novo trailer de Kingdom of Ash detalha as cinco classes jogáveis e mostra como as decisões do jogador alteram o mapa político.\n\nO lançamento está previsto para fevereiro de 2027.",
  ],
  [
    "Curiosidade: o primeiro jogo de corrida foi de 1974",
    "Um clássico de fliperama abriu caminho para todo o gênero que conhecemos hoje.",
    "Curiosidades",
    "14/10/2026",
    "capa-3",
    "Os jogos de corrida acompanham a história dos videogames desde os fliperamas dos anos 70.\n\nDe lá para cá, o gênero passou pelo arcade, pelos simuladores e pelos campeonatos online.",
  ],
  [
    "Pixel Quest chega ao mobile",
    "Versão para celulares terá controles adaptados e progresso sincronizado com o PC.",
    "Indie",
    "11/10/2026",
    "capa-2",
    "A equipe de Pixel Quest anunciou a versão mobile para dezembro, junto com o lançamento no PC.\n\nO progresso poderá ser sincronizado entre os dispositivos.",
  ],
];

function semente(banco) {
  const { total } = banco.prepare("SELECT COUNT(*) AS total FROM noticias").get();
  if (total > 0) return;
  const inserir = banco.prepare(
    "INSERT INTO noticias (titulo, resumo, categoria, data, capa, texto) VALUES (?, ?, ?, ?, ?, ?)"
  );
  for (const linha of [...iniciais].reverse()) inserir.run(...linha);
}

function validar(corpo) {
  const erros = [];
  if (typeof corpo.titulo !== "string" || !corpo.titulo) erros.push("O campo 'titulo' é obrigatório.");
  if (typeof corpo.texto !== "string" || !corpo.texto) erros.push("O campo 'texto' é obrigatório.");
  for (const campo of ["resumo", "categoria", "data", "capa"]) {
    if (corpo[campo] !== undefined && typeof corpo[campo] !== "string") {
      erros.push(`O campo '${campo}' deve ser um texto.`);
    }
  }
  return erros;
}

function criarRotas(banco) {
  return criarRotasCrud(banco, {
    tabela: "noticias",
    rotulo: "Notícia",
    campos: { titulo: "texto", resumo: "texto", categoria: "texto", data: "texto", capa: "texto", texto: "texto" },
    validar,
    protegerEscrita: somenteAdmin,
  });
}

module.exports = { ordem: 3, caminho: "/noticias", esquema, semente, criarRotas };
