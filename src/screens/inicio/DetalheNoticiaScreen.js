import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { buscarNoticia } from "../../dados/mockData";
import { cores, espaco } from "../../tema/tema";

export default function DetalheNoticiaScreen({ route }) {
  const noticia = buscarNoticia(route.params.noticiaId);

  return (
    <ScrollView style={estilos.container}>
      <Image source={noticia.capa} style={estilos.imagem} resizeMode="cover" />
      <View style={estilos.corpo}>
        <Text style={estilos.categoria}>{noticia.categoria}</Text>
        <Text style={estilos.titulo}>{noticia.titulo}</Text>
        <Text style={estilos.data}>{noticia.data}</Text>
        <Text style={estilos.texto}>{noticia.texto}</Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  imagem: { width: "100%", height: 220 },
  corpo: { padding: espaco.m },
  categoria: { color: cores.destaque, fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: "bold", marginTop: 6 },
  data: { color: cores.textoSuave, fontSize: 12, marginTop: 4, marginBottom: espaco.m },
  texto: { color: cores.texto, fontSize: 15, lineHeight: 24 },
});
