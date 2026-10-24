import React from "react";
import { useSelector } from "react-redux";
import FachadaDrawer from "./FachadaDrawer";
import AreaApoioStack from "./AreaApoioStack";

export default function RaizNavegacao() {
  const modo = useSelector((state) => state.app.modo);
  return modo === "apoio" ? <AreaApoioStack /> : <FachadaDrawer />;
}
