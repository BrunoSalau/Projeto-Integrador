const test = require("node:test");
const { criarApp } = require("../server");

function prepararServidor() {
  const estado = { servidor: null, base: "" };

  test.before(async () => {
    const app = criarApp(":memory:");
    await new Promise((resolver) => {
      estado.servidor = app.listen(0, resolver);
    });
    estado.base = `http://localhost:${estado.servidor.address().port}`;
  });

  test.after(() => {
    estado.servidor.close();
  });

  return async function chamar(metodo, caminho, corpo) {
    const resposta = await fetch(estado.base + caminho, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: corpo === undefined ? undefined : typeof corpo === "string" ? corpo : JSON.stringify(corpo),
    });
    const json = await resposta.json().catch(() => null);
    return { status: resposta.status, json };
  };
}

module.exports = { prepararServidor };
