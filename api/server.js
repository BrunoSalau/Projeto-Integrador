const express = require("express");
const cors = require("cors");
const { abrirBanco } = require("./src/banco");
const { carregarModulos } = require("./src/modulos");

function criarApp(arquivoBanco) {
  const banco = abrirBanco(arquivoBanco);
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ status: "ok", mensagem: "API do GameHub rodando." });
  });

  carregarModulos(app, banco);

  app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ erros: ["O corpo da requisição não é um JSON válido."] });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro interno no servidor." });
  });

  app.locals.banco = banco;
  return app;
}

module.exports = { criarApp };

if (require.main === module) {
  const porta = process.env.PORT || 3333;
  criarApp().listen(porta, "0.0.0.0", () => {
    console.log(`API do GameHub rodando em http://localhost:${porta}`);
  });
}
