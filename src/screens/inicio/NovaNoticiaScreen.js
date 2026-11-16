import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { criarNoticia, atualizarNoticia } from "../../servicos/noticiasApi";
import { cores, espaco, raio } from "../../tema/tema";

function dataDeHoje() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  return `${dia}/${mes}/${hoje.getFullYear()}`;
}

export default function NovaNoticiaScreen({ navigation, route }) {
  const noticia = route.params?.noticia;
  const [titulo, setTitulo] = useState(noticia ? noticia.titulo : "");
  const [categoria, setCategoria] = useState(noticia ? noticia.categoria : "");
  const [resumo, setResumo] = useState(noticia ? noticia.resumo : "");
  const [texto, setTexto] = useState(noticia ? noticia.texto : "");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);

  async function aoSalvar() {
    if (titulo.trim() === "" || texto.trim() === "") {
      setMensagem("Informe o título e o texto da notícia.");
      return;
    }

    const dados = { titulo, categoria, resumo, texto };
    setSalvando(true);
    try {
      if (noticia) {
        await atualizarNoticia(noticia.id, dados);
      } else {
        await criarNoticia({ ...dados, data: dataDeHoje(), capa: "capa-1" });
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
        <Text style={estilos.rotulo}>Título</Text>
        <TextInput style={estilos.input} value={titulo} onChangeText={setTitulo} placeholder="Título da notícia" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Categoria</Text>
        <TextInput style={estilos.input} value={categoria} onChangeText={setCategoria} placeholder="Ex.: Lançamentos" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Resumo</Text>
        <TextInput style={estilos.input} value={resumo} onChangeText={setResumo} placeholder="Uma frase sobre a notícia" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Texto</Text>
        <TextInput
          style={[estilos.input, estilos.inputGrande]}
          value={texto}
          onChangeText={setTexto}
          placeholder="Escreva a notícia"
          placeholderTextColor={cores.textoSuave}
          multiline
        />
      </View>

      {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

      <TouchableOpacity style={estilos.botao} onPress={aoSalvar} disabled={salvando}>
        <Text style={estilos.botaoTexto}>{noticia ? "Salvar alterações" : "Publicar"}</Text>
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
  inputGrande: { height: 150, textAlignVertical: "top" },
  mensagem: { color: cores.aviso, marginBottom: 12, fontSize: 13 },
  botao: { backgroundColor: cores.primaria, borderRadius: raio.m, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  botaoTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
