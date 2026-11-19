import React from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CardJogo from "../../componentes/CardJogo";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { listarJogos } from "../../servicos/jogosApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function LancamentosScreen({ navigation, route }) {
  const usuario = useSelector((state) => state.app.usuario);
  const genero = route.params?.genero;
  const { dados: jogos, carregando, erro, recarregar } = useCarregar(listarJogos);

  if (jogos === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

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
    <View style={estilos.container}>
      <FlatList
        style={estilos.container}
        data={lista}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={filtro}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhum jogo nesta categoria.</Text>}
        renderItem={({ item }) => (
          <CardJogo jogo={item} variante="linha" onPress={() => navigation.navigate("DetalheJogo", { jogoId: item.id })} />
        )}
      />
      {usuario?.role === "admin" && (
        <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate("NovoJogo")}>
          <Text style={estilos.botaoTexto}>+ Novo jogo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  lista: { padding: espaco.m, paddingBottom: 90 },
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
  vazio: { color: cores.textoSuave, textAlign: "center", marginTop: espaco.g },
});
