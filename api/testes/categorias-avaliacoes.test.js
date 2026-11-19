const test = require("node:test");
const assert = require("node:assert/strict");
const { prepararServidor } = require("./ajuda");

const chamar = prepararServidor();

test("dados iniciais de categorias, avaliações e indicadores existem", async () => {
  const categorias = await chamar("GET", "/categorias");
  const avaliacoes = await chamar("GET", "/avaliacoes");
  const indicadores = await chamar("GET", "/indicadores");
  assert.equal(categorias.json.length, 6);
  assert.equal(avaliacoes.json.length, 5);
  assert.equal(indicadores.json.length, 5);
  assert.equal(avaliacoes.json[0].jogoNome, "Nebula Rift");
  assert.equal(categorias.json[0].quantidadeJogos, 1);
});

test("CRUD completo em /categorias", async () => {
  const criado = await chamar("POST", "/categorias", { nome: "Simulação", icone: "airplane" });
  assert.equal(criado.status, 201);
  assert.equal(criado.json.quantidadeJogos, 0);

  const lido = await chamar("GET", `/categorias/${criado.json.id}`);
  assert.equal(lido.status, 200);

  const alterado = await chamar("PUT", `/categorias/${criado.json.id}`, { nome: "Simulador" });
  assert.equal(alterado.status, 200);
  assert.equal(alterado.json.nome, "Simulador");
  assert.equal(alterado.json.icone, "airplane");

  const removido = await chamar("DELETE", `/categorias/${criado.json.id}`);
  assert.equal(removido.status, 200);
  assert.equal((await chamar("GET", `/categorias/${criado.json.id}`)).status, 404);
});

test("CRUD completo em /avaliacoes com relacionamento a jogos", async () => {
  const criado = await chamar("POST", "/avaliacoes", { jogoId: 2, autor: "Teste", nota: 7, comentario: "ok" });
  assert.equal(criado.status, 201);
  assert.equal(criado.json.jogoNome, "Pixel Quest");

  const lido = await chamar("GET", `/avaliacoes/${criado.json.id}`);
  assert.equal(lido.status, 200);

  const alterado = await chamar("PUT", `/avaliacoes/${criado.json.id}`, { nota: 9 });
  assert.equal(alterado.status, 200);
  assert.equal(alterado.json.nota, 9);
  assert.equal(alterado.json.autor, "Teste");

  const removido = await chamar("DELETE", `/avaliacoes/${criado.json.id}`);
  assert.equal(removido.status, 200);
  assert.equal((await chamar("GET", `/avaliacoes/${criado.json.id}`)).status, 404);
});

test("filtro de avaliações por jogo", async () => {
  const porJogo = await chamar("GET", "/avaliacoes?jogoId=1");
  assert.equal(porJogo.json.length, 2);
});

test("relacionamento: avaliação com jogo inexistente é recusada com 400", async () => {
  const { status, json } = await chamar("POST", "/avaliacoes", { jogoId: 999, autor: "X", nota: 5 });
  assert.equal(status, 400);
  assert.match(json.erros[0], /Não existe jogo com id 999/);
});

test("relacionamento: trocar o jogo de uma avaliação para um inexistente é recusado", async () => {
  const { status } = await chamar("PUT", "/avaliacoes/1", { jogoId: 999 });
  assert.equal(status, 400);
});

test("integridade: não remove jogo que possui avaliações (409)", async () => {
  const { status, json } = await chamar("DELETE", "/jogos/1");
  assert.equal(status, 409);
  assert.match(json.erro, /registros relacionados/);
  assert.equal((await chamar("GET", "/jogos/1")).status, 200);
});

test("integridade: não remove categoria que possui jogos (409)", async () => {
  const { status } = await chamar("DELETE", "/categorias/1");
  assert.equal(status, 409);
});

test("categoria duplicada é recusada com 409", async () => {
  const { status } = await chamar("POST", "/categorias", { nome: "RPG" });
  assert.equal(status, 409);
});

test("validação: avaliação exige nota inteira entre 0 e 10 e categoria exige nome", async () => {
  assert.equal((await chamar("POST", "/avaliacoes", { jogoId: 1, autor: "X", nota: 11 })).status, 400);
  assert.equal((await chamar("POST", "/avaliacoes", { jogoId: 1, autor: "X", nota: "9" })).status, 400);
  assert.equal((await chamar("POST", "/avaliacoes", {})).status, 400);
  assert.equal((await chamar("POST", "/categorias", {})).status, 400);
});

test("indicadores são somente leitura", async () => {
  assert.equal((await chamar("POST", "/indicadores", { regiao: "X" })).status, 404);
  assert.equal((await chamar("DELETE", "/indicadores/1")).status, 404);
  const um = await chamar("GET", "/indicadores/1");
  assert.equal(um.status, 200);
  assert.ok(um.json.estimado > 0);
});
