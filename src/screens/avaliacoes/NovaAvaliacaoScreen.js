import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from "react-native";
import { cores, espaco, raio } from "../../tema/tema";

export default function NovaAvaliacaoScreen({ navigation }) {
  function aoSalvar() {
    Alert.alert("Avaliação", "O cadastro de avaliações será ligado à API nas próximas entregas.");
    navigation.goBack();
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Jogo</Text>
        <TextInput style={estilos.input} placeholder="Ex.: Nebula Rift" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Nota (0 a 10)</Text>
        <TextInput
          style={estilos.input}
          placeholder="Ex.: 9"
          placeholderTextColor={cores.textoSuave}
          keyboardType="numeric"
        />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Comentário</Text>
        <TextInput
          style={[estilos.input, estilos.inputGrande]}
          placeholder="Conte o que achou"
          placeholderTextColor={cores.textoSuave}
          multiline
        />
      </View>

      <TouchableOpacity style={estilos.botao} onPress={aoSalvar}>
        <Text style={estilos.botaoTexto}>Salvar</Text>
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
  botao: { backgroundColor: cores.primaria, borderRadius: raio.m, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  botaoTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
