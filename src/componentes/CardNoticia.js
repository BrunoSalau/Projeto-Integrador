import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { cores, espaco, raio } from "../tema/tema";

export default function CardNoticia({ noticia, onPress }) {
  return (
    <TouchableOpacity style={estilos.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={noticia.capa} style={estilos.imagem} resizeMode="cover" />
      <View style={estilos.corpo}>
        <View style={estilos.linhaTopo}>
          <Text style={estilos.categoria}>{noticia.categoria}</Text>
          <Text style={estilos.data}>{noticia.data}</Text>
        </View>
        <Text style={estilos.titulo}>{noticia.titulo}</Text>
        <Text style={estilos.resumo} numberOfLines={2}>
          {noticia.resumo}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raio.g,
    overflow: "hidden",
    marginHorizontal: espaco.m,
    marginBottom: espaco.m,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  imagem: { width: "100%", height: 150 },
  corpo: { padding: espaco.m },
  linhaTopo: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  categoria: { color: cores.destaque, fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  data: { color: cores.textoSuave, fontSize: 12 },
  titulo: { color: cores.texto, fontSize: 17, fontWeight: "bold", marginBottom: 4 },
  resumo: { color: cores.textoSuave, fontSize: 14, lineHeight: 20 },
});
