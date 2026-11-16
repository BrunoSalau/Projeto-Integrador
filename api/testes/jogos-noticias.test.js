const test = require("node:test");
const assert = require("node:assert/strict");
const { prepararServidor } = require("./ajuda");

const chamar = prepararServidor();

test("rota raiz informa que a API está no ar", async () => {
  const { status, json } = await chamar("GET", "/");
  assert.equal(status, 200);
  assert.equal(json.status, "ok");
});

test("dados iniciais de jogos e notícias existem", async () => {
  const jogos = await chamar("GET", "/jogos");
  const noticias = await chamar("GET", "/noticias");
  assert.equal(jogos.json.length, 6);
  assert.equal(noticias.json.length, 4);
  assert.equal(jogos.json[0].genero, "Ação");
});

test("CRUD completo em /jogos com relacionamento a categorias", async () => {
  const criado = await chamar("POST", "/jogos", { nome: "Jogo Teste", categoriaId: 1, nota: 7.5 });
  assert.equal(criado.status, 201);
  assert.equal(criado.json.genero, "Ação");

  const lido = await chamar("GET", `/jogos/${criado.json.id}`);
  assert.equal(lido.status, 200);

  const alterado = await chamar("PUT", `/jogos/${criado.json.id}`, { categoriaId: 3 });
  assert.equal(alterado.status, 200);
  assert.equal(alterado.json.genero, "RPG");
  assert.equal(alterado.json.nome, "Jogo Teste");

  const removido = await chamar("DELETE", `/jogos/${criado.json.id}`);
  assert.equal(removido.status, 200);
  assert.equal((await chamar("GET", `/jogos/${criado.json.id}`)).status, 404);
});

test("CRUD completo em /noticias", async () => {
  const criado = await chamar("POST", "/noticias", { titulo: "Teste", texto: "Texto de teste" });
  assert.equal(criado.status, 201);

  const lido = await chamar("GET", `/noticias/${criado.json.id}`);
  assert.equal(lido.status, 200);

  const alterado = await chamar("PUT", `/noticias/${criado.json.id}`, { titulo: "Teste 2" });
  assert.equal(alterado.status, 200);
  assert.equal(alterado.json.titulo, "Teste 2");
  assert.equal(alterado.json.texto, "Texto de teste");

  const removido = await chamar("DELETE", `/noticias/${criado.json.id}`);
  assert.equal(removido.status, 200);
  assert.equal((await chamar("GET", `/noticias/${criado.json.id}`)).status, 404);
});

test("listagem aceita ordem decrescente", async () => {
  const asc = (await chamar("GET", "/noticias")).json;
  const desc = (await chamar("GET", "/noticias?ordem=desc")).json;
  assert.equal(desc[0].id, asc[asc.length - 1].id);
  assert.equal(desc[0].titulo, "Nebula Rift ganha data de lançamento");
});

test("filtros de jogos por categoria e por nome", async () => {
  const porGenero = await chamar("GET", "/jogos?categoriaId=3");
  assert.equal(porGenero.json.length, 1);
  assert.equal(porGenero.json[0].nome, "Kingdom of Ash");
  const porNome = await chamar("GET", "/jogos?nome=nebula%20rift");
  assert.equal(porNome.json.length, 1);
});

test("relacionamento: jogo com categoria inexistente é recusado com 400", async () => {
  const { status, json } = await chamar("POST", "/jogos", { nome: "X", categoriaId: 999, nota: 5 });
  assert.equal(status, 400);
  assert.match(json.erros[0], /Não existe categoria com id 999/);
});

test("relacionamento: trocar a categoria de um jogo para uma inexistente é recusado", async () => {
  const { status } = await chamar("PUT", "/jogos/1", { categoriaId: 999 });
  assert.equal(status, 400);
});

test("validação: campos obrigatórios e faixa da nota retornam 400", async () => {
  const vazio = await chamar("POST", "/jogos", {});
  assert.equal(vazio.status, 400);
  assert.ok(vazio.json.erros.length >= 2);
  assert.equal((await chamar("POST", "/jogos", { nome: "X", categoriaId: 1, nota: 11 })).status, 400);
  assert.equal((await chamar("POST", "/noticias", { titulo: "Sem texto" })).status, 400);
});

test("id inexistente retorna 404 e id inválido retorna 400", async () => {
  assert.equal((await chamar("GET", "/jogos/9999")).status, 404);
  assert.equal((await chamar("PUT", "/jogos/9999", { nome: "A" })).status, 404);
  assert.equal((await chamar("DELETE", "/jogos/9999")).status, 404);
  assert.equal((await chamar("GET", "/jogos/abc")).status, 400);
});

test("JSON inválido retorna 400 e rota desconhecida retorna 404", async () => {
  assert.equal((await chamar("POST", "/jogos", "{quebrado")).status, 400);
  assert.equal((await chamar("GET", "/inexistente")).status, 404);
});
