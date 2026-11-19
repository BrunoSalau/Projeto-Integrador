const express = require("express");

function lerId(valor) {
  const id = Number(valor);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function responderConstraint(erro, res) {
  if (String(erro.code).startsWith("SQLITE_CONSTRAINT")) {
    res.status(409).json({ erro: "Já existe um registro com esses dados ou há uma referência inválida." });
    return true;
  }
  return false;
}

function criarRotasCrud(banco, config) {
  const { tabela, rotulo, campos, selecao, validar, relacionar, somenteLeitura, protegerEscrita, autorizarCriacao, autorizarRegistro, prepararAtualizacao } = config;
  const roteador = express.Router();
  const nomes = Object.keys(campos);
  const base = selecao || `SELECT ${tabela}.* FROM ${tabela}`;

  function buscarPorId(id) {
    return banco.prepare(`${base} WHERE ${tabela}.id = ?`).get(id);
  }

  function limpar(corpo) {
    const dados = {};
    for (const nome of nomes) {
      if (corpo[nome] !== undefined) {
        dados[nome] = typeof corpo[nome] === "string" ? corpo[nome].trim() : corpo[nome];
      }
    }
    return dados;
  }

  function validarTudo(dados) {
    const erros = validar ? validar(dados) : [];
    if (erros.length > 0) return erros;
    return relacionar ? relacionar(dados, banco) : [];
  }

  roteador.get("/", (req, res) => {
    const condicoes = [];
    const valores = [];
    for (const nome of ["id", ...nomes]) {
      const filtro = req.query[nome];
      if (filtro === undefined) continue;
      if (nome !== "id" && campos[nome] === "texto") {
        condicoes.push(`${tabela}.${nome} = ? COLLATE NOCASE`);
        valores.push(String(filtro));
      } else {
        condicoes.push(`${tabela}.${nome} = ?`);
        valores.push(Number(filtro));
      }
    }
    const where = condicoes.length ? ` WHERE ${condicoes.join(" AND ")}` : "";
    const sentido = req.query.ordem === "desc" ? "DESC" : "ASC";
    res.json(banco.prepare(`${base}${where} ORDER BY ${tabela}.id ${sentido}`).all(...valores));
  });

  roteador.get("/:id", (req, res) => {
    const id = lerId(req.params.id);
    if (id === null) return res.status(400).json({ erros: ["O id informado é inválido."] });
    const item = buscarPorId(id);
    if (!item) return res.status(404).json({ erro: `${rotulo} com id ${id} não encontrado.` });
    res.json(item);
  });

  if (somenteLeitura) return roteador;

  roteador.post("/", ...(protegerEscrita ? [protegerEscrita] : []), (req, res) => {
    const dados = limpar(req.body || {});
    const erros = validarTudo(dados);
    if (erros.length > 0) return res.status(400).json({ erros });
    if (autorizarCriacao && !autorizarCriacao(req, dados, res)) return;
    const colunas = Object.keys(dados);
    try {
      const resultado = banco
        .prepare(`INSERT INTO ${tabela} (${colunas.join(", ")}) VALUES (${colunas.map((c) => `@${c}`).join(", ")})`)
        .run(dados);
      res.status(201).json(buscarPorId(Number(resultado.lastInsertRowid)));
    } catch (erro) {
      if (!responderConstraint(erro, res)) throw erro;
    }
  });

  roteador.put("/:id", ...(protegerEscrita ? [protegerEscrita] : []), (req, res) => {
    const id = lerId(req.params.id);
    if (id === null) return res.status(400).json({ erros: ["O id informado é inválido."] });
    const atual = banco.prepare(`SELECT * FROM ${tabela} WHERE id = ?`).get(id);
    if (!atual) return res.status(404).json({ erro: `${rotulo} com id ${id} não encontrado.` });
    if (autorizarRegistro && !autorizarRegistro(req, atual, res)) return;
    const dados = { ...limpar(atual), ...limpar(req.body || {}) };
    if (prepararAtualizacao) prepararAtualizacao(req, dados, atual);
    const erros = validarTudo(dados);
    if (erros.length > 0) return res.status(400).json({ erros });
    const atribuicoes = Object.keys(dados).map((c) => `${c} = @${c}`).join(", ");
    try {
      banco.prepare(`UPDATE ${tabela} SET ${atribuicoes} WHERE id = @id`).run({ ...dados, id });
      res.json(buscarPorId(id));
    } catch (erro) {
      if (!responderConstraint(erro, res)) throw erro;
    }
  });

  roteador.delete("/:id", ...(protegerEscrita ? [protegerEscrita] : []), (req, res) => {
    const id = lerId(req.params.id);
    if (id === null) return res.status(400).json({ erros: ["O id informado é inválido."] });
    const item = buscarPorId(id);
    if (!item) return res.status(404).json({ erro: `${rotulo} com id ${id} não encontrado.` });
    if (autorizarRegistro && !autorizarRegistro(req, item, res)) return;
    try {
      banco.prepare(`DELETE FROM ${tabela} WHERE id = ?`).run(id);
    } catch (erro) {
      if (String(erro.code).startsWith("SQLITE_CONSTRAINT")) {
        return res.status(409).json({ erro: `${rotulo} com id ${id} possui registros relacionados e não pode ser removido.` });
      }
      throw erro;
    }
    res.json({ removido: item });
  });

  return roteador;
}

module.exports = { criarRotasCrud };
