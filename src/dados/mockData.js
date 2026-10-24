export const categorias = [
  { id: "c1", nome: "Ação", icone: "sword-cross" },
  { id: "c2", nome: "Aventura", icone: "compass-rose" },
  { id: "c3", nome: "RPG", icone: "wizard-hat" },
  { id: "c4", nome: "Corrida", icone: "car-sports" },
  { id: "c5", nome: "Estratégia", icone: "chess-knight" },
  { id: "c6", nome: "Indie", icone: "controller-classic" },
];

export const jogos = [
  {
    id: "j1",
    nome: "Nebula Rift",
    genero: "Ação",
    plataforma: "PC / Console",
    lancamento: "12/11/2026",
    nota: 9.1,
    capa: require("../../assets/gamehub/capa-1.png"),
    descricao: "Tiro espacial em primeira pessoa com campanha cooperativa para até quatro jogadores.",
  },
  {
    id: "j2",
    nome: "Pixel Quest",
    genero: "Aventura",
    plataforma: "PC / Mobile",
    lancamento: "03/12/2026",
    nota: 8.4,
    capa: require("../../assets/gamehub/capa-2.png"),
    descricao: "Aventura em pixel art com exploração de masmorras e quebra-cabeças.",
  },
  {
    id: "j3",
    nome: "Turbo Drift GP",
    genero: "Corrida",
    plataforma: "Console",
    lancamento: "20/01/2027",
    nota: 8.8,
    capa: require("../../assets/gamehub/capa-3.png"),
    descricao: "Corrida arcade com pistas dinâmicas e campeonato online semanal.",
  },
  {
    id: "j4",
    nome: "Kingdom of Ash",
    genero: "RPG",
    plataforma: "PC / Console",
    lancamento: "15/02/2027",
    nota: 9.3,
    capa: require("../../assets/gamehub/capa-4.png"),
    descricao: "RPG de mundo aberto com escolhas que mudam o destino dos reinos.",
  },
  {
    id: "j5",
    nome: "Starfarer Command",
    genero: "Estratégia",
    plataforma: "PC",
    lancamento: "08/03/2027",
    nota: 7.9,
    capa: require("../../assets/gamehub/capa-5.png"),
    descricao: "Estratégia em tempo real com gestão de frotas e diplomacia galáctica.",
  },
  {
    id: "j6",
    nome: "Block Builders",
    genero: "Indie",
    plataforma: "PC / Mobile",
    lancamento: "27/03/2027",
    nota: 8.2,
    capa: require("../../assets/gamehub/capa-6.png"),
    descricao: "Construção criativa em blocos com modo desafio e galeria de criações.",
  },
];

export const noticias = [
  {
    id: "n1",
    titulo: "Nebula Rift ganha data de lançamento",
    resumo: "O aguardado jogo de tiro espacial chega em novembro com beta aberto no mês anterior.",
    categoria: "Lançamentos",
    data: "18/10/2026",
    capa: require("../../assets/gamehub/capa-1.png"),
    texto:
      "A desenvolvedora confirmou que Nebula Rift chega em 12 de novembro. O beta aberto acontece duas semanas antes e traz três mapas cooperativos.\n\nO jogo terá campanha para até quatro jogadores e suporte a partidas entre plataformas.",
  },
  {
    id: "n2",
    titulo: "Kingdom of Ash mostra novo trailer",
    resumo: "Vídeo de seis minutos apresenta classes, combate e o sistema de reinos.",
    categoria: "RPG",
    data: "16/10/2026",
    capa: require("../../assets/gamehub/capa-4.png"),
    texto:
      "O novo trailer de Kingdom of Ash detalha as cinco classes jogáveis e mostra como as decisões do jogador alteram o mapa político.\n\nO lançamento está previsto para fevereiro de 2027.",
  },
  {
    id: "n3",
    titulo: "Curiosidade: o primeiro jogo de corrida foi de 1974",
    resumo: "Um clássico de fliperama abriu caminho para todo o gênero que conhecemos hoje.",
    categoria: "Curiosidades",
    data: "14/10/2026",
    capa: require("../../assets/gamehub/capa-3.png"),
    texto:
      "Os jogos de corrida acompanham a história dos videogames desde os fliperamas dos anos 70.\n\nDe lá para cá, o gênero passou pelo arcade, pelos simuladores e pelos campeonatos online.",
  },
  {
    id: "n4",
    titulo: "Pixel Quest chega ao mobile",
    resumo: "Versão para celulares terá controles adaptados e progresso sincronizado com o PC.",
    categoria: "Indie",
    data: "11/10/2026",
    capa: require("../../assets/gamehub/capa-2.png"),
    texto:
      "A equipe de Pixel Quest anunciou a versão mobile para dezembro, junto com o lançamento no PC.\n\nO progresso poderá ser sincronizado entre os dispositivos.",
  },
];

export const avaliacoes = [
  { id: "a1", jogoId: "j1", autor: "Lucas", nota: 9, comentario: "Cooperativo muito bem feito, as fases são variadas." },
  { id: "a2", jogoId: "j4", autor: "Marina", nota: 10, comentario: "Mundo enorme e história envolvente do começo ao fim." },
  { id: "a3", jogoId: "j3", autor: "Rafael", nota: 8, comentario: "Pistas ótimas, mas faltam mais carros no início." },
  { id: "a4", jogoId: "j2", autor: "Bianca", nota: 8, comentario: "Visual lindo e quebra-cabeças na medida certa." },
  { id: "a5", jogoId: "j1", autor: "Diego", nota: 9, comentario: "Jogo com amigos é outra experiência." },
];

export function buscarJogo(jogoId) {
  return jogos.find((j) => j.id === jogoId);
}

export function buscarNoticia(noticiaId) {
  return noticias.find((n) => n.id === noticiaId);
}

export function avaliacoesDoJogo(jogoId) {
  return avaliacoes.filter((a) => a.jogoId === jogoId);
}
