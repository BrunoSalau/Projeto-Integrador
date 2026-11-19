import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CardJogo from "../../componentes/CardJogo";
import CardNoticia from "../../componentes/CardNoticia";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { listarJogos } from "../../servicos/jogosApi";
import { listarNoticias } from "../../servicos/noticiasApi";
import { listarCategorias } from "../../servicos/categoriasApi";
import { cores, espaco, raio } from "../../tema/tema";

async function buscarInicio() {
  const [categorias, jogos, noticias] = await Promise.all([listarCategorias(), listarJogos(), listarNoticias()]);
  return { categorias, jogos, noticias };
}

export default function HomeScreen({ navigation }) {
  const usuario = useSelector((state) => state.app.usuario);
  const { dados, carregando, erro, recarregar } = useCarregar(buscarInicio);

  if (dados === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  const { categorias, jogos, noticias } = dados;
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
        keyExtractor={(item) => String(item.id)}
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
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.listaHorizontal}
        renderItem={({ item }) => (
          <CardJogo jogo={item} variante="destaque" onPress={() => navigation.navigate("DetalheJogo", { jogoId: item.id })} />
        )}
      />

      <View style={estilos.linhaSecao}>
        <Text style={estilos.secaoTitulo}>Últimas notícias</Text>
        {usuario?.role === "admin" && <TouchableOpacity onPress={() => navigation.navigate("NovaNoticia")} hitSlop={10}>
          <Text style={estilos.novo}>+ Nova</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );

  return (
    <FlatList
      style={estilos.container}
      data={noticias}
      keyExtractor={(item) => String(item.id)}
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
  linhaSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: espaco.m,
    marginTop: espaco.m,
    marginBottom: 10,
  },
  secaoTitulo: { color: cores.texto, fontSize: 18, fontWeight: "bold" },
  novo: { color: cores.destaque, fontSize: 14, fontWeight: "600" },
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
