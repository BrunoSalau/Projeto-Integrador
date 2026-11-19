const fs = require("fs");
const path = require("path");
const { criarRotasCrud } = require("../crud");

const esquema = `
CREATE TABLE IF NOT EXISTS indicadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  regiao TEXT NOT NULL UNIQUE,
  anoObservado INTEGER NOT NULL,
  observado INTEGER NOT NULL,
  anoEstimado INTEGER NOT NULL,
  estimado INTEGER NOT NULL,
  margem INTEGER NOT NULL,
  modelo TEXT NOT NULL
);
`;

function semente(banco) {
  const { total } = banco.prepare("SELECT COUNT(*) AS total FROM indicadores").get();
  if (total > 0) return;
  const arquivo = path.join(__dirname, "..", "..", "dados", "indicadores.json");
  if (!fs.existsSync(arquivo)) return;
  const registros = JSON.parse(fs.readFileSync(arquivo, "utf-8"));
  const inserir = banco.prepare(
    "INSERT INTO indicadores (regiao, anoObservado, observado, anoEstimado, estimado, margem, modelo) VALUES (@regiao, @anoObservado, @observado, @anoEstimado, @estimado, @margem, @modelo)"
  );
  for (const registro of registros) inserir.run(registro);
}

function criarRotas(banco) {
  return criarRotasCrud(banco, {
    tabela: "indicadores",
    rotulo: "Indicador",
    campos: {
      regiao: "texto",
      anoObservado: "numero",
      observado: "numero",
      anoEstimado: "numero",
      estimado: "numero",
      margem: "numero",
      modelo: "texto",
    },
    somenteLeitura: true,
  });
}

module.exports = { ordem: 5, caminho: "/indicadores", esquema, semente, criarRotas };
