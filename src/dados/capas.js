const capas = {
  "capa-1": require("../../assets/gamehub/capa-1.png"),
  "capa-2": require("../../assets/gamehub/capa-2.png"),
  "capa-3": require("../../assets/gamehub/capa-3.png"),
  "capa-4": require("../../assets/gamehub/capa-4.png"),
  "capa-5": require("../../assets/gamehub/capa-5.png"),
  "capa-6": require("../../assets/gamehub/capa-6.png"),
};

export function comCapa(item) {
  return { ...item, capa: capas[item.capa] || capas["capa-1"] };
}
