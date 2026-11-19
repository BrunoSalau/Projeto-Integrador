const express = require("express");
const { criarHash, conferirSenha, gerarToken, autenticar } = require("../autenticacao");

const esquema = `
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  senhaHash TEXT NOT NULL,
  senhaSalt TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  criadoEm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

function semente(banco) {
  const email = process.env.GAMEHUB_ADMIN_EMAIL;
  const senha = process.env.GAMEHUB_ADMIN_PASSWORD;
  if (!email || !senha) return;
  if (senha.length < 8) {
    console.warn("GAMEHUB_ADMIN_PASSWORD precisa ter pelo menos 8 caracteres.");
    return;
  }
  const existe = banco.prepare("SELECT id FROM usuarios WHERE email = ? COLLATE NOCASE").get(email.trim());
  if (existe) {
    banco.prepare("UPDATE usuarios SET role = 'admin' WHERE id = ?").run(existe.id);
    return;
  }
  const { salt, hash } = criarHash(senha);
  banco.prepare("INSERT INTO usuarios (nome, email, senhaHash, senhaSalt, role) VALUES (?, ?, ?, ?, 'admin')")
    .run("Administrador", email.trim().toLowerCase(), hash, salt);
  console.log(`Conta administradora criada: ${email.trim()}`);
}

function criarRotas(banco) {
  const roteador = express.Router();

  roteador.post("/cadastro", (req, res) => {
    const nome = String(req.body?.nome || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const senha = String(req.body?.senha || "");
    if (nome.length < 2) return res.status(400).json({ erro: "Informe seu nome." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ erro: "Informe um e-mail válido." });
    if (senha.length < 8) return res.status(400).json({ erro: "A senha precisa ter pelo menos 8 caracteres." });
    if (banco.prepare("SELECT id FROM usuarios WHERE email = ? COLLATE NOCASE").get(email)) {
      return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
    }
    const { salt, hash } = criarHash(senha);
    const resultado = banco.prepare("INSERT INTO usuarios (nome, email, senhaHash, senhaSalt, role) VALUES (?, ?, ?, ?, 'user')")
      .run(nome, email, hash, salt);
    const usuario = banco.prepare("SELECT id, nome, email, role FROM usuarios WHERE id = ?").get(Number(resultado.lastInsertRowid));
    res.status(201).json({ usuario, token: gerarToken(usuario) });
  });

  roteador.post("/login", (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const senha = String(req.body?.senha || "");
    const registro = banco.prepare("SELECT * FROM usuarios WHERE email = ? COLLATE NOCASE").get(email);
    if (!registro || !conferirSenha(senha, registro.senhaSalt, registro.senhaHash)) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }
    const usuario = { id: registro.id, nome: registro.nome, email: registro.email, role: registro.role };
    res.json({ usuario, token: gerarToken(usuario) });
  });

  roteador.get("/me", autenticar, (req, res) => res.json({ usuario: req.usuario }));
  return roteador;
}

module.exports = { ordem: 0, caminho: "/usuarios", esquema, semente, criarRotas };
