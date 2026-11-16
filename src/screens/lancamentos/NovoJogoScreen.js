import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { criarJogo, atualizarJogo } from "../../servicos/jogosApi";
import { listarCategorias } from "../../servicos/categoriasApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function NovoJogoScreen({ navigation, route }) {
  const jogo = route.params?.jogo;
  const [nome, setNome] = useState(jogo ? jogo.nome : "");
  const [categoriaId, setCategoriaId] = useState(jogo ? jogo.categoriaId : null);
  const [plataforma, setPlataforma] = useState(jogo ? jogo.plataforma : "");
  const [lancamento, setLancamento] = useState(jogo ? jogo.lancamento : "");
  const [nota, setNota] = useState(jogo ? String(jogo.nota) : "");
  const [descricao, setDescricao] = useState(jogo ? jogo.descricao : "");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const { dados: categorias, carregando, erro, recarregar } = useCarregar(listarCategorias);

  if (categorias === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  async function aoSalvar() {
    const valorNota = Number(nota.replace(",", "."));
    if (nome.trim() === "" || categoriaId === null) {
      setMensagem("Informe o nome e escolha uma categoria.");
      return;
    }
    if (nota.trim() === "" || Number.isNaN(valorNota) || valorNota < 0 || valorNota > 10) {
      setMensagem("A nota deve ser um número entre 0 e 10.");
      return;
    }

    const dados = { nome, categoriaId, plataforma, lancamento, nota: valorNota, descricao };
    setSalvando(true);
    try {
      if (jogo) {
        await atualizarJogo(jogo.id, dados);
      } else {
        await criarJogo({ ...dados, capa: "capa-1" });
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
        <Text style={estilos.rotulo}>Nome do jogo</Text>
        <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Ex.: Nebula Rift" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Categoria</Text>
        <View style={estilos.chips}>
          {categorias.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[estilos.chip, categoriaId === c.id && estilos.chipAtivo]}
              onPress={() => setCategoriaId(c.id)}
              activeOpacity={0.85}
            >
              <Text style={estilos.chipTexto}>{c.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Plataforma</Text>
        <TextInput style={estilos.input} value={plataforma} onChangeText={setPlataforma} placeholder="Ex.: PC / Console" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Lançamento</Text>
        <TextInput style={estilos.input} value={lancamento} onChangeText={setLancamento} placeholder="Ex.: 12/11/2026" placeholderTextColor={cores.textoSuave} />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Nota (0 a 10)</Text>
        <TextInput style={estilos.input} value={nota} onChangeText={setNota} placeholder="Ex.: 8.5" placeholderTextColor={cores.textoSuave} keyboardType="numeric" />
      </View>

      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Descrição</Text>
        <TextInput
          style={[estilos.input, estilos.inputGrande]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Conte sobre o jogo"
          placeholderTextColor={cores.textoSuave}
          multiline
        />
      </View>

      {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

      <TouchableOpacity style={estilos.botao} onPress={aoSalvar} disabled={salvando}>
        <Text style={estilos.botaoTexto}>{jogo ? "Salvar alterações" : "Salvar"}</Text>
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
  chips: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: cores.superficie,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  chipAtivo: { borderColor: cores.destaque, backgroundColor: cores.superficieAlt },
  chipTexto: { color: cores.texto, fontSize: 12 },
  mensagem: { color: cores.aviso, marginBottom: 12, fontSize: 13 },
  botao: { backgroundColor: cores.primaria, borderRadius: raio.m, paddingVertical: 15, alignItems: "center", marginTop: 8 },
  botaoTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
