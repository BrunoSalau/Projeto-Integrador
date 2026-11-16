const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

function abrirBanco(arquivo) {
  const caminho = arquivo || process.env.DB_ARQUIVO || path.join(__dirname, "..", "dados", "gamehub.db");
  if (caminho !== ":memory:") {
    fs.mkdirSync(path.dirname(caminho), { recursive: true });
  }
  const banco = new Database(caminho);
  banco.pragma("foreign_keys = ON");
  return banco;
}

module.exports = { abrirBanco };
