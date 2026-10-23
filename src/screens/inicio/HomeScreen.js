import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CardJogo from "../../componentes/CardJogo";
import CardNoticia from "../../componentes/CardNoticia";
import { categorias, jogos, noticias } from "../../dados/mockData";
import { cores, espaco, raio } from "../../tema/tema";

export default function HomeScreen({ navigation }) {
  const populares = jogos.filter((j) => j.nota >= 8.5);

  const cabecalho = (
    <View>
      <View style={estilos.bannerBox}>
        <Image source={require("../../../assets/gamehub/banner.png")} style={estilos.banner} resizeMode="cover" />
        <View style={estilos.bannerTextos}>
          <Text style={estilos.bannerTitulo}>GameHub</Text>
          <Text style={estilos.bannerSub}>Notícias, lançamentos e avaliações</Text>
        </View>
      </View>

      <Text style={estilos.secao}>Categorias</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categorias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.listaHorizontal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.chip}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("TabLancamentos", { screen: "ListaLancamentos", params: { genero: item.nome } })
            }
          >
            <MaterialCommunityIcons name={item.icone} size={16} color={cores.textoSuave} />
            <Text style={estilos.chipTexto}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={estilos.secao}>Jogos populares</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={populares}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.listaHorizontal}
        renderItem={({ item }) => (
          <CardJogo jogo={item} variante="destaque" onPress={() => navigation.navigate("DetalheJogo", { jogoId: item.id })} />
        )}
      />

      <Text style={estilos.secao}>Últimas notícias</Text>
    </View>
  );

  return (
    <FlatList
      style={estilos.container}
      data={noticias}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={cabecalho}
      contentContainerStyle={estilos.conteudo}
      renderItem={({ item }) => (
        <CardNoticia noticia={item} onPress={() => navigation.navigate("DetalheNoticia", { noticiaId: item.id })} />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingBottom: espaco.g },
  bannerBox: { margin: espaco.m, borderRadius: raio.g, overflow: "hidden", height: 150, justifyContent: "flex-end" },
  banner: { ...StyleSheet.absoluteFillObject, width: "100%", height: "100%" },
  bannerTextos: { padding: espaco.m, backgroundColor: "rgba(0,0,0,0.5)" },
  bannerTitulo: { color: cores.texto, fontSize: 24, fontWeight: "bold" },
  bannerSub: { color: cores.texto, fontSize: 13 },
  secao: { color: cores.texto, fontSize: 18, fontWeight: "bold", marginHorizontal: espaco.m, marginTop: espaco.m, marginBottom: 10 },
  listaHorizontal: { paddingHorizontal: espaco.m },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  chipTexto: { color: cores.texto, fontSize: 12, marginLeft: 6, textTransform: "uppercase", letterSpacing: 0.5 },
});
