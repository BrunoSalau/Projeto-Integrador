const test = require("node:test");
const assert = require("node:assert/strict");
const { prepararServidor } = require("./ajuda");
const chamar = prepararServidor();
const contato = { nome: "Pessoa de confiança", parentesco: "amiga", telefone: "11999999999" };

test("rede de apoio: CRUD completo com consulta por id", async () => {
  const criado = await chamar("POST", "/rede-apoio", contato, "user");
  assert.equal(criado.status, 201);
  const url = "/rede-apoio/" + criado.json.id;
  const lido = await chamar("GET", url, undefined, "user");
  assert.equal(lido.status, 200);
  assert.equal(lido.json.nome, contato.nome);
  const lista = await chamar("GET", "/rede-apoio", undefined, "user");
  assert.ok(lista.json.some(c => c.id === criado.json.id));
  const editado = await chamar("PUT", url, { ...contato, nome: "Nome atualizado" }, "user");
  assert.equal(editado.status, 200);
  assert.equal((await chamar("GET", url, undefined, "user")).json.nome, "Nome atualizado");
  assert.equal((await chamar("DELETE", url, undefined, "user")).status, 200);
  assert.equal((await chamar("GET", url, undefined, "user")).status, 404);
});

test("contatos ficam privados entre usuárias em todas as operações", async () => {
  const criado = await chamar("POST", "/rede-apoio", contato, "user");
  assert.equal(criado.status, 201);
  const url = "/rede-apoio/" + criado.json.id;
  const lista = await chamar("GET", "/rede-apoio", undefined, "outra");
  assert.equal(lista.status, 200);
  assert.ok(!lista.json.some(c => c.id === criado.json.id));
  assert.equal((await chamar("GET", url, undefined, "outra")).status, 404);
  assert.equal((await chamar("PUT", url, contato, "outra")).status, 404);
  assert.equal((await chamar("DELETE", url, undefined, "outra")).status, 404);
  assert.equal((await chamar("GET", url, undefined, "user")).status, 200);
  await chamar("DELETE", url, undefined, "user");
});

test("rede de apoio exige sessão e recusa administradores", async () => {
  for (const perfil of [null, "admin"]) {
    const status = perfil === null ? 401 : 403;
    for (const [metodo, url, corpo] of [["GET", "/rede-apoio"], ["GET", "/rede-apoio/1"], ["POST", "/rede-apoio", contato], ["PUT", "/rede-apoio/1", contato], ["DELETE", "/rede-apoio/1"]]) {
      assert.equal((await chamar(metodo, url, corpo, perfil)).status, status);
    }
  }
});

test("consulta de contato rejeita id inválido e contato inexistente", async () => {
  for (const id of ["abc", "0", "-1", "1.5"]) assert.equal((await chamar("GET", "/rede-apoio/" + id, undefined, "user")).status, 400);
  assert.equal((await chamar("GET", "/rede-apoio/99999", undefined, "user")).status, 404);
  assert.equal((await chamar("POST", "/rede-apoio", { ...contato, telefone: "abc" }, "user")).status, 400);
});

test("escritas administrativas exigem login e papel de admin", async () => {
  for (const url of ["/categorias", "/jogos", "/noticias"]) {
    assert.equal((await chamar("POST", url, {}, null)).status, 401);
    assert.equal((await chamar("POST", url, {}, "user")).status, 403);
  }
});

test("usuária só edita e remove as próprias avaliações", async () => {
  const criado = await chamar("POST", "/avaliacoes", { jogoId: 1, autor: "Outro nome", nota: 8 }, "user");
  assert.equal(criado.status, 201);
  assert.equal(criado.json.autor, "Teste");
  assert.ok(criado.json.userId);
  const url = "/avaliacoes/" + criado.json.id;
  for (const perfil of ["outra", "admin"]) {
    assert.equal((await chamar("PUT", url, { nota: 1 }, perfil)).status, 403);
    assert.equal((await chamar("DELETE", url, undefined, perfil)).status, 403);
  }
  assert.equal((await chamar("POST", "/avaliacoes", { jogoId: 1, autor: "Admin", nota: 8 }, "admin")).status, 403);
  assert.equal((await chamar("DELETE", url, undefined, "user")).status, 200);
});

test("login e cadastro tratam credenciais inválidas e duplicidade", async () => {
  assert.equal((await chamar("POST", "/usuarios/login", { email: "user@teste.invalid", senha: "errada" }, null)).status, 401);
  assert.equal((await chamar("POST", "/usuarios/cadastro", { nome: "Teste", email: "user@teste.invalid", senha: "senha-teste-user" }, null)).status, 409);
  assert.equal((await chamar("POST", "/usuarios/cadastro", { nome: "X", email: "invalido", senha: "curta" }, null)).status, 400);
  assert.equal((await chamar("GET", "/usuarios/me", undefined, "user")).status, 200);
  assert.equal((await chamar("GET", "/usuarios/me", undefined, null)).status, 401);
});
