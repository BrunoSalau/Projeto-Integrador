import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { abrirApoio, salvarJogosJogados } from "../../redux/appSlice";
import { CODIGO_SECRETO } from "../../config/codigoSecreto";
import { cores, espaco, raio } from "../../tema/tema";

export default function MeusJogosScreen() {
  const dispatch = useDispatch();
  const jogosJogados = useSelector((state) => state.app.jogosJogados);
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");

  function aoConfirmar() {
    const valor = texto.trim();

    if (valor === CODIGO_SECRETO) {
      setTexto("");
      setMensagem("");
      dispatch(abrirApoio());
      return;
    }

    const numero = Number(valor);
    if (valor === "" || !Number.isInteger(numero) || numero < 0) {
      setMensagem("Digite um número inteiro válido.");
      return;
    }

    dispatch(salvarJogosJogados(numero));
    setMensagem("Contagem atualizada!");
    setTexto("");
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.cartao}>
        <Ionicons name="game-controller" size={32} color={cores.destaque} />
        <Text style={estilos.pergunta}>Quantos jogos você já jogou?</Text>
        <Text style={estilos.ajuda}>Informe um número e acompanhe sua coleção no GameHub.</Text>

        <TextInput
          style={estilos.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Ex.: 15"
          placeholderTextColor={cores.textoSuave}
          keyboardType="number-pad"
          onSubmitEditing={aoConfirmar}
        />

        <TouchableOpacity style={estilos.botao} onPress={aoConfirmar}>
          <Text style={estilos.botaoTexto}>Salvar</Text>
        </TouchableOpacity>

        {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}
      </View>

      <View style={estilos.resumo}>
        <Text style={estilos.resumoNumero}>{jogosJogados === null ? "-" : jogosJogados}</Text>
        <Text style={estilos.resumoRotulo}>jogos jogados</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: espaco.m },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.g,
    padding: espaco.g,
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.borda,
  },
  pergunta: { color: cores.texto, fontSize: 20, fontWeight: "bold", marginTop: 10, textAlign: "center" },
  ajuda: { color: cores.textoSuave, fontSize: 13, marginTop: 6, marginBottom: espaco.m, textAlign: "center" },
  input: {
    width: "100%",
    backgroundColor: cores.fundo,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 18,
    color: cores.texto,
    textAlign: "center",
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botao: {
    width: "100%",
    backgroundColor: cores.primaria,
    borderRadius: raio.m,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  mensagem: { color: cores.aviso, marginTop: 12, fontSize: 13 },
  resumo: { alignItems: "center", marginTop: espaco.g },
  resumoNumero: { color: cores.destaque, fontSize: 48, fontWeight: "bold" },
  resumoRotulo: { color: cores.textoSuave, fontSize: 14 },
});
