import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { avaliacoes, buscarJogo } from "../../dados/mockData";
import { cores, espaco, raio } from "../../tema/tema";

export default function AvaliacoesScreen({ navigation }) {
  return (
    <View style={estilos.container}>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={estilos.lista}
        renderItem={({ item }) => {
          const jogo = buscarJogo(item.jogoId);
          return (
            <View style={estilos.card}>
              <View style={estilos.linha}>
                <Text style={estilos.jogo}>{jogo.nome}</Text>
                <Text style={estilos.nota}>{item.nota}/10</Text>
              </View>
              <Text style={estilos.autor}>por {item.autor}</Text>
              <Text style={estilos.comentario}>{item.comentario}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate("NovaAvaliacao")}>
        <Text style={estilos.botaoTexto}>+ Nova avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  lista: { padding: espaco.m, paddingBottom: 90 },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  linha: { flexDirection: "row", justifyContent: "space-between" },
  jogo: { color: cores.texto, fontSize: 16, fontWeight: "bold" },
  nota: { color: cores.destaque, fontWeight: "bold" },
  autor: { color: cores.textoSuave, fontSize: 12, marginTop: 2 },
  comentario: { color: cores.texto, marginTop: 8, lineHeight: 20 },
  botao: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: cores.primaria,
    borderRadius: raio.m,
    paddingVertical: 14,
    alignItems: "center",
  },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 15 },
});
