const { criarRotasCrud } = require("../crud");
const { somenteAdmin } = require("../autenticacao");

const esquema = `
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL UNIQUE,
  icone TEXT NOT NULL DEFAULT 'controller-classic'
);
`;

const iniciais = [
  ["Ação", "sword-cross"],
  ["Aventura", "compass-rose"],
  ["RPG", "wizard-hat"],
  ["Corrida", "car-sports"],
  ["Estratégia", "chess-knight"],
  ["Indie", "controller-classic"],
];

function semente(banco) {
  const { total } = banco.prepare("SELECT COUNT(*) AS total FROM categorias").get();
  if (total > 0) return;
  const inserir = banco.prepare("INSERT INTO categorias (nome, icone) VALUES (?, ?)");
  for (const [nome, icone] of iniciais) inserir.run(nome, icone);
}

function validar(corpo) {
  const erros = [];
  if (typeof corpo.nome !== "string" || !corpo.nome) erros.push("O campo 'nome' é obrigatório.");
  if (corpo.icone !== undefined && (typeof corpo.icone !== "string" || !corpo.icone)) {
    erros.push("O campo 'icone' deve ser um texto.");
  }
  return erros;
}

function criarRotas(banco) {
  return criarRotasCrud(banco, {
    tabela: "categorias",
    rotulo: "Categoria",
    campos: { nome: "texto", icone: "texto" },
    selecao:
      "SELECT categorias.*, (SELECT COUNT(*) FROM jogos WHERE jogos.categoriaId = categorias.id) AS quantidadeJogos FROM categorias",
    validar,
    protegerEscrita: somenteAdmin,
  });
}

module.exports = { ordem: 1, caminho: "/categorias", esquema, semente, criarRotas };
