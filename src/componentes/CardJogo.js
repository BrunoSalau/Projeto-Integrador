import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { cores, espaco, raio } from "../tema/tema";

export default function CardJogo({ jogo, variante = "destaque", onPress }) {
  if (variante === "linha") {
    return (
      <TouchableOpacity style={estilos.linha} onPress={onPress} activeOpacity={0.85}>
        <Image source={jogo.capa} style={estilos.capaLinha} resizeMode="cover" />
        <View style={estilos.infoLinha}>
          <Text style={estilos.nome} numberOfLines={1}>
            {jogo.nome}
          </Text>
          <Text style={estilos.meta}>
            {jogo.genero} · {jogo.plataforma}
          </Text>
          <Text style={estilos.meta}>Lançamento: {jogo.lancamento}</Text>
        </View>
        <Text style={estilos.nota}>★ {jogo.nota.toFixed(1)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={estilos.destaque} onPress={onPress} activeOpacity={0.85}>
      <Image source={jogo.capa} style={estilos.capaDestaque} resizeMode="cover" />
      <View style={estilos.infoDestaque}>
        <Text style={estilos.nome} numberOfLines={1}>
          {jogo.nome}
        </Text>
        <Text style={estilos.nota}>★ {jogo.nota.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  destaque: {
    width: 170,
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    overflow: "hidden",
    marginRight: espaco.m,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  capaDestaque: { width: "100%", height: 100 },
  infoDestaque: { padding: 10 },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  capaLinha: { width: 96, height: 72, borderRadius: 10 },
  infoLinha: { flex: 1, marginHorizontal: 12 },
  nome: { color: cores.texto, fontSize: 15, fontWeight: "bold" },
  meta: { color: cores.textoSuave, fontSize: 12, marginTop: 2 },
  nota: { color: cores.aviso, fontSize: 14, fontWeight: "bold", marginTop: 2 },
});
