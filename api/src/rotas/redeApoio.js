const express = require("express");
const { autenticar } = require("../autenticacao");

const esquema = `
CREATE TABLE IF NOT EXISTS contatos_apoio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuarioId INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  parentesco TEXT NOT NULL,
  telefone TEXT NOT NULL,
  criadoEm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contatos_apoio_usuario ON contatos_apoio(usuarioId);
`;

function criarRotas(banco) {
  const roteador = express.Router();
  roteador.use(autenticar);
  roteador.use((req, res, next) => {
    if (req.usuario.role !== "user") return res.status(403).json({ erro: "A Rede de Apoio é exclusiva de contas de usuárias." });
    next();
  });

  roteador.get("/", (req, res) => {
    const contatos = banco.prepare("SELECT id, nome, parentesco, telefone FROM contatos_apoio WHERE usuarioId = ? ORDER BY id DESC").all(req.usuario.id);
    res.json(contatos);
  });

  roteador.post("/", (req, res) => {
    const nome = String(req.body?.nome || "").trim();
    const parentesco = String(req.body?.parentesco || "").trim();
    const telefone = String(req.body?.telefone || "").trim();
    if (nome.length < 2 || nome.length > 80) return res.status(400).json({ erro: "Informe um nome entre 2 e 80 caracteres." });
    if (parentesco.length < 2 || parentesco.length > 50) return res.status(400).json({ erro: "Informe o parentesco ou relação." });
    if (!/^[0-9()+.\s-]{8,25}$/.test(telefone)) return res.status(400).json({ erro: "Informe um telefone válido." });
    const resultado = banco.prepare("INSERT INTO contatos_apoio (usuarioId, nome, parentesco, telefone) VALUES (?, ?, ?, ?)").run(req.usuario.id, nome, parentesco, telefone);
    const contato = banco.prepare("SELECT id, nome, parentesco, telefone FROM contatos_apoio WHERE id = ? AND usuarioId = ?").get(Number(resultado.lastInsertRowid), req.usuario.id);
    res.status(201).json(contato);
  });

  roteador.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const existente = banco.prepare("SELECT id FROM contatos_apoio WHERE id = ? AND usuarioId = ?").get(id, req.usuario.id);
    if (!existente) return res.status(404).json({ erro: "Contato não encontrado." });
    const nome = String(req.body?.nome || "").trim();
    const parentesco = String(req.body?.parentesco || "").trim();
    const telefone = String(req.body?.telefone || "").trim();
    if (nome.length < 2 || nome.length > 80) return res.status(400).json({ erro: "Informe um nome entre 2 e 80 caracteres." });
    if (parentesco.length < 2 || parentesco.length > 50) return res.status(400).json({ erro: "Informe o parentesco ou relação." });
    if (!/^[0-9()+.\s-]{8,25}$/.test(telefone)) return res.status(400).json({ erro: "Informe um telefone válido." });
    banco.prepare("UPDATE contatos_apoio SET nome = ?, parentesco = ?, telefone = ? WHERE id = ? AND usuarioId = ?").run(nome, parentesco, telefone, id, req.usuario.id);
    res.json({ id, nome, parentesco, telefone });
  });

  roteador.delete("/:id", (req, res) => {
    const resultado = banco.prepare("DELETE FROM contatos_apoio WHERE id = ? AND usuarioId = ?").run(Number(req.params.id), req.usuario.id);
    if (!resultado.changes) return res.status(404).json({ erro: "Contato não encontrado." });
    res.json({ mensagem: "Contato excluído com sucesso." });
  });
  return roteador;
}

module.exports = { ordem: 7, caminho: "/rede-apoio", esquema, criarRotas };
