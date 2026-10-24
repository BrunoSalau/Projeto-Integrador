import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    modo: "fachada",
    jogosJogados: null,
  },
  reducers: {
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

export const { abrirApoio, voltarParaFachada, salvarJogosJogados } = appSlice.actions;
export default appSlice.reducer;
