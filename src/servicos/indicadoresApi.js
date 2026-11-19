import { requisitar } from "./http";

export function listarIndicadores() {
  return requisitar("/indicadores");
}
