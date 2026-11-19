import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { buscarJogoPorNome } from "../../servicos/jogosApi";
import { criarAvaliacao, atualizarAvaliacao } from "../../servicos/avaliacoesApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function NovaAvaliacaoScreen({ navigation, route }) {
  const usuario = useSelector((state) => state.app.usuario);
  const avaliacao = route.params?.avaliacao;
  const [jogo, setJogo] = useState(avaliacao ? avaliacao.jogoNome : "");
  const autor = usuario?.nome || "";
  const [nota, setNota] = useState(avaliacao ? String(avaliacao.nota) : "");
  const [comentario, setComentario] = useState(avaliacao ? avaliacao.comentario : "");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function aoSalvar() {
    const valorNota = Number(nota);
    if (jogo.trim() === "" || !autor) {
      setMensagem("Informe o jogo.");
      return;
    }
    if (nota.trim() === "" || !Number.isInteger(valorNota) || valorNota < 0 || valorNota > 10) {
      setMensagem("A nota deve ser um número inteiro entre 0 e 10.");
      return;
    }

    setSalvando(true);
    try {
      const encontrado = await buscarJogoPorNome(jogo.trim());
      if (!encontrado) {
        setMensagem("Jogo não encontrado. Digite o nome de um jogo do GameHub.");
        return;
      }
      const dados = { jogoId: encontrado.id, autor, nota: valorNota, comentario };
      if (avaliacao) {
        await atualizarAvaliacao(avaliacao.id, dados);
      } else {
        await criarAvaliacao(dados);
      }
      navigation.goBack();
    } catch (e) {
      setMensagem(e.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Jogo</Text>
        <TextInput
          style={estilos.input}
          value={jogo}
          onChangeText={setJogo}
          placeholder="Ex.: Nebula Rift"
          placeholderTextColor={cores.textoSuave}
        />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Nota (0 a 10)</Text>
        <TextInput
          style={estilos.input}
          value={nota}
          onChangeText={setNota}
          placeholder="Ex.: 9"
          placeholderTextColor={cores.textoSuave}
          keyboardType="numeric"
        />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Comentário</Text>
        <TextInput
          style={[estilos.input, estilos.inputGrande]}
          value={comentario}
          onChangeText={setComentario}
          placeholder="Conte o que achou"
          placeholderTextColor={cores.textoSuave}
          multiline
        />
      </View>

      {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

      <TouchableOpacity style={estilos.botao} onPress={aoSalvar} disabled={salvando}>
        <Text style={estilos.botaoTexto}>{avaliacao ? "Salvar alterações" : "Salvar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: espaco.m, paddingBottom: 60 },
  campo: { marginBottom: 18 },
  rotulo: { color: cores.texto, fontSize: 13, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: cores.superficie,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  inputGrande: { height: 110, textAlignVertical: "top" },
  mensagem: { color: cores.aviso, marginBottom: 12, fontSize: 13 },
  botao: { backgroundColor: cores.primaria, borderRadius: raio.m, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  botaoTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
