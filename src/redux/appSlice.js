import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    modo: "fachada",
    jogosJogados: null,
    usuario: null,
  },
  reducers: {
    definirUsuario(state, action) {
      state.usuario = action.payload;
    },
    limparUsuario(state) {
      state.usuario = null;
    },
    abrirApoio(state) {
      state.modo = "apoio";
    },
    voltarParaFachada(state) {
      state.modo = "fachada";
    },
    salvarJogosJogados(state, action) {
      state.jogosJogados = action.payload;
    },
  },
});

export const { definirUsuario, limparUsuario, abrirApoio, voltarParaFachada, salvarJogosJogados } = appSlice.actions;
export default appSlice.reducer;
