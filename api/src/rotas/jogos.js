const { criarRotasCrud } = require("../crud");

const esquema = `
CREATE TABLE IF NOT EXISTS jogos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  categoriaId INTEGER NOT NULL REFERENCES categorias(id),
  plataforma TEXT NOT NULL DEFAULT '',
  lancamento TEXT NOT NULL DEFAULT '',
  nota REAL NOT NULL,
  capa TEXT NOT NULL DEFAULT '',
  descricao TEXT NOT NULL DEFAULT ''
);
`;

const iniciais = [
  ["Nebula Rift", "Ação", "PC / Console", "12/11/2026", 9.1, "capa-1", "Tiro espacial em primeira pessoa com campanha cooperativa para até quatro jogadores."],
  ["Pixel Quest", "Aventura", "PC / Mobile", "03/12/2026", 8.4, "capa-2", "Aventura em pixel art com exploração de masmorras e quebra-cabeças."],
  ["Turbo Drift GP", "Corrida", "Console", "20/01/2027", 8.8, "capa-3", "Corrida arcade com pistas dinâmicas e campeonato online semanal."],
  ["Kingdom of Ash", "RPG", "PC / Console", "15/02/2027", 9.3, "capa-4", "RPG de mundo aberto com escolhas que mudam o destino dos reinos."],
  ["Starfarer Command", "Estratégia", "PC", "08/03/2027", 7.9, "capa-5", "Estratégia em tempo real com gestão de frotas e diplomacia galáctica."],
  ["Block Builders", "Indie", "PC / Mobile", "27/03/2027", 8.2, "capa-6", "Construção criativa em blocos com modo desafio e galeria de criações."],
];

function semente(banco) {
  const { total } = banco.prepare("SELECT COUNT(*) AS total FROM jogos").get();
  if (total > 0) return;
  const categoria = banco.prepare("SELECT id FROM categorias WHERE nome = ?");
  const inserir = banco.prepare(
    "INSERT INTO jogos (nome, categoriaId, plataforma, lancamento, nota, capa, descricao) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (const [nome, genero, plataforma, lancamento, nota, capa, descricao] of iniciais) {
    const { id } = categoria.get(genero);
    inserir.run(nome, id, plataforma, lancamento, nota, capa, descricao);
  }
}

function validar(corpo) {
  const erros = [];
  if (typeof corpo.nome !== "string" || !corpo.nome) erros.push("O campo 'nome' é obrigatório.");
  if (!Number.isInteger(corpo.categoriaId) || corpo.categoriaId < 1) {
    erros.push("O campo 'categoriaId' é obrigatório e deve ser um número inteiro.");
  }
  if (typeof corpo.nota !== "number" || Number.isNaN(corpo.nota) || corpo.nota < 0 || corpo.nota > 10) {
    erros.push("O campo 'nota' é obrigatório e deve ser um número entre 0 e 10.");
  }
  for (const campo of ["plataforma", "lancamento", "capa", "descricao"]) {
    if (corpo[campo] !== undefined && typeof corpo[campo] !== "string") {
      erros.push(`O campo '${campo}' deve ser um texto.`);
    }
  }
  return erros;
}

function relacionar(corpo, banco) {
  const existe = banco.prepare("SELECT 1 FROM categorias WHERE id = ?").get(corpo.categoriaId);
  return existe ? [] : [`Não existe categoria com id ${corpo.categoriaId}.`];
}

function criarRotas(banco) {
  return criarRotasCrud(banco, {
    tabela: "jogos",
    rotulo: "Jogo",
    campos: {
      nome: "texto",
      categoriaId: "numero",
      plataforma: "texto",
      lancamento: "texto",
      nota: "numero",
      capa: "texto",
      descricao: "texto",
    },
    selecao: "SELECT jogos.*, categorias.nome AS genero FROM jogos JOIN categorias ON categorias.id = jogos.categoriaId",
    validar,
    relacionar,
  });
}

module.exports = { ordem: 2, caminho: "/jogos", esquema, semente, criarRotas };
