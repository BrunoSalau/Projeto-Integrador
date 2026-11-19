import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { listarAvaliacoes, removerAvaliacao } from "../../servicos/avaliacoesApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function AvaliacoesScreen({ navigation }) {
  const usuario = useSelector((state) => state.app.usuario);
  const [selecionada, setSelecionada] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const { dados: avaliacoes, carregando, erro, recarregar } = useCarregar(listarAvaliacoes);

  if (avaliacoes === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  async function aoExcluir(id) {
    try {
      await removerAvaliacao(id);
      setSelecionada(null);
      setMensagem("");
      recarregar();
    } catch (e) {
      setMensagem(e.message);
    }
  }

  return (
    <View style={estilos.container}>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={<Text style={estilos.vazio}>Nenhuma avaliação cadastrada.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={estilos.card}
            activeOpacity={0.85}
            onPress={() => {
              if (usuario?.role === "user" && item.userId === usuario.id) {
                navigation.navigate("NovaAvaliacao", { avaliacao: item });
              }
            }}
            onLongPress={() => {
              if (usuario?.role === "user" && item.userId === usuario.id) setSelecionada(item.id);
            }}
          >
            <View style={estilos.linha}>
              <Text style={estilos.jogo}>{item.jogoNome}</Text>
              <Text style={estilos.nota}>{item.nota}/10</Text>
            </View>
            <Text style={estilos.autor}>por {item.autor}</Text>
            <Text style={estilos.comentario}>{item.comentario}</Text>
            {selecionada === item.id && usuario?.role === "user" && item.userId === usuario.id && (
              <View style={estilos.linhaAcoes}>
                <TouchableOpacity style={[estilos.acao, estilos.acaoPerigo]} onPress={() => aoExcluir(item.id)}>
                  <Text style={estilos.acaoTexto}>Excluir avaliação</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.acao} onPress={() => setSelecionada(null)}>
                  <Text style={estilos.acaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

      {usuario?.role === "user" && <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate("NovaAvaliacao")}>
        <Text style={estilos.botaoTexto}>+ Nova avaliação</Text>
      </TouchableOpacity>}
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
  vazio: { color: cores.textoSuave, textAlign: "center", marginTop: espaco.g },
  mensagem: { position: "absolute", bottom: 74, left: 20, right: 20, color: cores.aviso, fontSize: 13, textAlign: "center" },
  linhaAcoes: { flexDirection: "row", marginTop: 12 },
  acao: {
    flex: 1,
    backgroundColor: cores.fundo,
    borderRadius: raio.m,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  acaoPerigo: { borderColor: cores.aviso },
  acaoTexto: { color: cores.texto, fontWeight: "600", fontSize: 13 },
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
