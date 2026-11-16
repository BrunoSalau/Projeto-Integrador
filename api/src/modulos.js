const fs = require("fs");
const path = require("path");

function carregarModulos(app, banco) {
  const pasta = path.join(__dirname, "rotas");
  const modulos = fs
    .readdirSync(pasta)
    .filter((arquivo) => arquivo.endsWith(".js"))
    .map((arquivo) => require(path.join(pasta, arquivo)))
    .sort((a, b) => a.ordem - b.ordem);

  for (const modulo of modulos) {
    banco.exec(modulo.esquema);
    if (modulo.semente) modulo.semente(banco);
    app.use(modulo.caminho, modulo.criarRotas(banco));
  }
}

module.exports = { carregarModulos };
