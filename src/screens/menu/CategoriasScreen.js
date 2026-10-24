import React from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { categorias, jogos } from "../../dados/mockData";
import { cores, espaco, raio } from "../../tema/tema";

export default function CategoriasScreen({ navigation }) {
  function abrirCategoria(genero) {
    navigation.navigate("Portal", {
      screen: "TabLancamentos",
      params: { screen: "ListaLancamentos", params: { genero } },
    });
  }

  return (
    <FlatList
      style={estilos.container}
      data={categorias}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={estilos.coluna}
      contentContainerStyle={estilos.lista}
      renderItem={({ item }) => {
        const quantidade = jogos.filter((j) => j.genero === item.nome).length;
        return (
          <TouchableOpacity style={estilos.card} activeOpacity={0.85} onPress={() => abrirCategoria(item.nome)}>
            <MaterialCommunityIcons name={item.icone} size={30} color={cores.textoSuave} />
            <Text style={estilos.nome}>{item.nome}</Text>
            <Text style={estilos.quantidade}>
              {quantidade} {quantidade === 1 ? "jogo" : "jogos"}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  lista: { padding: espaco.m },
  coluna: { justifyContent: "space-between" },
  card: {
    width: "48%",
    backgroundColor: cores.superficie,
    borderRadius: raio.g,
    paddingVertical: espaco.g,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  nome: { color: cores.texto, fontSize: 16, fontWeight: "bold", marginTop: 10 },
  quantidade: { color: cores.textoSuave, fontSize: 12, marginTop: 2 },
});
