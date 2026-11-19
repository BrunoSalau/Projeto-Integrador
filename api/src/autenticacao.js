const crypto = require("crypto");

const segredo = process.env.AUTH_SECRET || "gamehub-segredo-local-altere-em-producao";

function criarHash(senha, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(senha, salt, 64).toString("hex");
  return { salt, hash };
}

function conferirSenha(senha, salt, hash) {
  const atual = crypto.scryptSync(senha, salt, 64);
  const esperado = Buffer.from(hash, "hex");
  return esperado.length === atual.length && crypto.timingSafeEqual(atual, esperado);
}

function gerarToken(usuario) {
  const dados = Buffer.from(JSON.stringify({ id: usuario.id, email: usuario.email, role: usuario.role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString("base64url");
  const assinatura = crypto.createHmac("sha256", segredo).update(dados).digest("base64url");
  return `${dados}.${assinatura}`;
}

function verificarToken(token) {
  const partes = String(token || "").split(".");
  if (partes.length !== 2) return null;
  const assinatura = crypto.createHmac("sha256", segredo).update(partes[0]).digest("base64url");
  const a = Buffer.from(assinatura);
  const b = Buffer.from(partes[1]);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const dados = JSON.parse(Buffer.from(partes[0], "base64url").toString("utf8"));
    if (!dados.id || dados.exp < Date.now()) return null;
    return dados;
  } catch {
    return null;
  }
}

function autenticar(req, res, next) {
  const cabecalho = req.headers.authorization || "";
  const token = cabecalho.startsWith("Bearer ") ? cabecalho.slice(7) : "";
  const dados = verificarToken(token);
  if (!dados) return res.status(401).json({ erro: "Faça login para realizar esta operação." });
  const usuario = req.app.locals.banco.prepare("SELECT id, nome, email, role FROM usuarios WHERE id = ?").get(dados.id);
  if (!usuario) return res.status(401).json({ erro: "Sessão inválida. Faça login novamente." });
  req.usuario = usuario;
  next();
}

function somenteAdmin(req, res, next) {
  autenticar(req, res, () => {
    if (req.usuario.role !== "admin") return res.status(403).json({ erro: "Somente administradores podem realizar esta operação." });
    next();
  });
}

module.exports = { criarHash, conferirSenha, gerarToken, autenticar, somenteAdmin };
