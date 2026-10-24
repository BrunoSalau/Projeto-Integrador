import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { buscarJogo, avaliacoesDoJogo } from "../../dados/mockData";
import { cores, espaco, raio } from "../../tema/tema";

export default function DetalheJogoScreen({ route }) {
  const jogo = buscarJogo(route.params.jogoId);
  const avaliacoes = avaliacoesDoJogo(jogo.id);

  return (
    <ScrollView style={estilos.container}>
      <Image source={jogo.capa} style={estilos.imagem} resizeMode="cover" />
      <View style={estilos.corpo}>
        <View style={estilos.linhaTitulo}>
          <Text style={estilos.titulo}>{jogo.nome}</Text>
          <Text style={estilos.nota}>★ {jogo.nota.toFixed(1)}</Text>
        </View>
        <Text style={estilos.meta}>
          {jogo.genero} · {jogo.plataforma}
        </Text>
        <Text style={estilos.meta}>Lançamento: {jogo.lancamento}</Text>
        <Text style={estilos.descricao}>{jogo.descricao}</Text>

        <Text style={estilos.secao}>Avaliações</Text>
        {avaliacoes.length === 0 ? (
          <Text style={estilos.meta}>Ainda não há avaliações para este jogo.</Text>
        ) : (
          avaliacoes.map((a) => (
            <View key={a.id} style={estilos.avaliacao}>
              <View style={estilos.linhaTitulo}>
                <Text style={estilos.autor}>{a.autor}</Text>
                <Text style={estilos.notaAvaliacao}>{a.nota}/10</Text>
              </View>
              <Text style={estilos.comentario}>{a.comentario}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  imagem: { width: "100%", height: 220 },
  corpo: { padding: espaco.m },
  linhaTitulo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: "bold", flex: 1 },
  nota: { color: cores.aviso, fontSize: 18, fontWeight: "bold" },
  meta: { color: cores.textoSuave, fontSize: 13, marginTop: 4 },
  descricao: { color: cores.texto, fontSize: 15, lineHeight: 24, marginTop: espaco.m },
  secao: { color: cores.texto, fontSize: 18, fontWeight: "bold", marginTop: espaco.g, marginBottom: 10 },
  avaliacao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  autor: { color: cores.texto, fontWeight: "600" },
  notaAvaliacao: { color: cores.destaque, fontWeight: "bold" },
  comentario: { color: cores.textoSuave, marginTop: 4, lineHeight: 20 },
});
