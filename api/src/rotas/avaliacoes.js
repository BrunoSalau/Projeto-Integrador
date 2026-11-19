const { criarRotasCrud } = require("../crud");
const { autenticar } = require("../autenticacao");

const esquema = `
CREATE TABLE IF NOT EXISTS avaliacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jogoId INTEGER NOT NULL REFERENCES jogos(id),
  autor TEXT NOT NULL,
  nota INTEGER NOT NULL,
  comentario TEXT NOT NULL DEFAULT '',
  userId INTEGER REFERENCES usuarios(id)
);
`;

const iniciais = [
  ["Nebula Rift", "Lucas", 9, "Cooperativo muito bem feito, as fases são variadas."],
  ["Kingdom of Ash", "Marina", 10, "Mundo enorme e história envolvente do começo ao fim."],
  ["Turbo Drift GP", "Rafael", 8, "Pistas ótimas, mas faltam mais carros no início."],
  ["Pixel Quest", "Bianca", 8, "Visual lindo e quebra-cabeças na medida certa."],
  ["Nebula Rift", "Diego", 9, "Jogo com amigos é outra experiência."],
];

function semente(banco) {
  const colunas = banco.prepare("PRAGMA table_info(avaliacoes)").all().map((coluna) => coluna.name);
  if (!colunas.includes("userId")) banco.exec("ALTER TABLE avaliacoes ADD COLUMN userId INTEGER REFERENCES usuarios(id)");
  const { total } = banco.prepare("SELECT COUNT(*) AS total FROM avaliacoes").get();
  if (total > 0) return;
  const jogo = banco.prepare("SELECT id FROM jogos WHERE nome = ?");
  const inserir = banco.prepare("INSERT INTO avaliacoes (jogoId, autor, nota, comentario) VALUES (?, ?, ?, ?)");
  for (const [nomeJogo, autor, nota, comentario] of iniciais) {
    const { id } = jogo.get(nomeJogo);
    inserir.run(id, autor, nota, comentario);
  }
}

function validar(corpo) {
  const erros = [];
  if (!Number.isInteger(corpo.jogoId) || corpo.jogoId < 1) {
    erros.push("O campo 'jogoId' é obrigatório e deve ser um número inteiro.");
  }
  if (typeof corpo.autor !== "string" || !corpo.autor) erros.push("O campo 'autor' é obrigatório.");
  if (!Number.isInteger(corpo.nota) || corpo.nota < 0 || corpo.nota > 10) {
    erros.push("O campo 'nota' é obrigatório e deve ser um número inteiro entre 0 e 10.");
  }
  if (corpo.comentario !== undefined && typeof corpo.comentario !== "string") {
    erros.push("O campo 'comentario' deve ser um texto.");
  }
  return erros;
}

function relacionar(corpo, banco) {
  const existe = banco.prepare("SELECT 1 FROM jogos WHERE id = ?").get(corpo.jogoId);
  return existe ? [] : [`Não existe jogo com id ${corpo.jogoId}.`];
}

function criarRotas(banco) {
  return criarRotasCrud(banco, {
    tabela: "avaliacoes",
    rotulo: "Avaliação",
    campos: { jogoId: "numero", autor: "texto", nota: "numero", comentario: "texto" },
    selecao: "SELECT avaliacoes.*, jogos.nome AS jogoNome FROM avaliacoes JOIN jogos ON jogos.id = avaliacoes.jogoId",
    validar,
    relacionar,
    protegerEscrita: autenticar,
    autorizarCriacao(req, dados, res) {
      if (req.usuario.role !== "user") {
        res.status(403).json({ erro: "Administradores não podem cadastrar avaliações." });
        return false;
      }
      dados.userId = req.usuario.id;
      dados.autor = req.usuario.nome;
      return true;
    },
    prepararAtualizacao(req, dados) {
      dados.autor = req.usuario.nome;
    },
    autorizarRegistro(req, registro, res) {
      if (req.usuario.role !== "user" || registro.userId !== req.usuario.id) {
        res.status(403).json({ erro: "Você só pode editar ou excluir suas próprias avaliações." });
        return false;
      }
      return true;
    },
  });
}

module.exports = { ordem: 4, caminho: "/avaliacoes", esquema, semente, criarRotas };
