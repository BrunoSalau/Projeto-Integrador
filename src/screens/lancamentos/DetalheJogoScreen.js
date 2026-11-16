import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { buscarJogo, removerJogo } from "../../servicos/jogosApi";
import { listarAvaliacoes } from "../../servicos/avaliacoesApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function DetalheJogoScreen({ navigation, route }) {
  const jogoId = route.params.jogoId;
  const [confirmando, setConfirmando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const { dados, carregando, erro, recarregar } = useCarregar(async () => {
    const [jogo, avaliacoes] = await Promise.all([buscarJogo(jogoId), listarAvaliacoes(jogoId)]);
    return { jogo, avaliacoes };
  }, jogoId);

  if (dados === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  const { jogo, avaliacoes } = dados;

  async function aoExcluir() {
    try {
      await removerJogo(jogo.id);
      navigation.goBack();
    } catch (e) {
      setConfirmando(false);
      setMensagem(e.message);
    }
  }

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

        {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

        {confirmando ? (
          <View style={estilos.linhaAcoes}>
            <TouchableOpacity style={[estilos.acao, estilos.acaoPerigo]} onPress={aoExcluir}>
              <Text style={estilos.acaoTexto}>Confirmar exclusão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={() => setConfirmando(false)}>
              <Text style={estilos.acaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={estilos.linhaAcoes}>
            <TouchableOpacity style={estilos.acao} onPress={() => navigation.navigate("NovoJogo", { jogo })}>
              <Text style={estilos.acaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={() => setConfirmando(true)}>
              <Text style={estilos.acaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
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
  mensagem: { color: cores.aviso, marginTop: 12, fontSize: 13 },
  linhaAcoes: { flexDirection: "row", marginTop: espaco.m },
  acao: {
    flex: 1,
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    paddingVertical: 12,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  acaoPerigo: { borderColor: cores.aviso },
  acaoTexto: { color: cores.texto, fontWeight: "600", fontSize: 14 },
});
