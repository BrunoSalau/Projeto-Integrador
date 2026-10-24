import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CardJogo from "../../componentes/CardJogo";
import { jogos } from "../../dados/mockData";
import { cores, espaco, raio } from "../../tema/tema";

export default function LancamentosScreen({ navigation, route }) {
  const genero = route.params?.genero;
  const lista = genero ? jogos.filter((j) => j.genero === genero) : jogos;

  const filtro = genero ? (
    <View style={estilos.filtro}>
      <Text style={estilos.filtroTexto}>Categoria: {genero}</Text>
      <TouchableOpacity onPress={() => navigation.setParams({ genero: undefined })} hitSlop={10}>
        <Text style={estilos.filtroLimpar}>Limpar filtro</Text>
      </TouchableOpacity>
    </View>
  ) : null;

  return (
    <FlatList
      style={estilos.container}
      data={lista}
      keyExtractor={(item) => item.id}
      contentContainerStyle={estilos.lista}
      ListHeaderComponent={filtro}
      ListEmptyComponent={<Text style={estilos.vazio}>Nenhum jogo nesta categoria.</Text>}
      renderItem={({ item }) => (
        <CardJogo jogo={item} variante="linha" onPress={() => navigation.navigate("DetalheJogo", { jogoId: item.id })} />
      )}
    />
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  lista: { padding: espaco.m },
  filtro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  filtroTexto: { color: cores.texto, fontSize: 14, fontWeight: "600" },
  filtroLimpar: { color: cores.destaque, fontSize: 13, fontWeight: "600" },
  vazio: { color: cores.textoSuave, textAlign: "center", marginTop: espaco.g },
});
