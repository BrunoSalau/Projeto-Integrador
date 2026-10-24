import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { cores, espaco } from "../../tema/tema";

export default function SobreScreen() {
  return (
    <View style={estilos.container}>
      <Image source={require("../../../assets/gamehub/logo.png")} style={estilos.logo} />
      <Text style={estilos.titulo}>GameHub</Text>
      <Text style={estilos.versao}>Versão 1.0.0</Text>
      <Text style={estilos.texto}>
        Portal com notícias, lançamentos, avaliações e curiosidades do universo dos jogos eletrônicos.
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, alignItems: "center", padding: espaco.g, paddingTop: 40 },
  logo: { width: 96, height: 96, borderRadius: 24 },
  titulo: { color: cores.texto, fontSize: 24, fontWeight: "bold", marginTop: 14 },
  versao: { color: cores.textoSuave, fontSize: 13, marginTop: 2 },
  texto: { color: cores.texto, fontSize: 15, lineHeight: 24, textAlign: "center", marginTop: espaco.g },
});
