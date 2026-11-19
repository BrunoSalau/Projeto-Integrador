import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { listarCategorias, criarCategoria, atualizarCategoria, removerCategoria } from "../../servicos/categoriasApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function CategoriasScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const { dados: categorias, carregando, erro, recarregar } = useCarregar(listarCategorias);

  if (categorias === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  function limpar() {
    setNome("");
    setEditando(null);
  }

  async function executar(acao) {
    try {
      await acao();
      limpar();
      setMensagem("");
      recarregar();
    } catch (e) {
      setMensagem(e.message);
    }
  }

  function aoSalvar() {
    if (nome.trim() === "") {
      setMensagem("Informe o nome da categoria.");
      return;
    }
    executar(() => (editando ? atualizarCategoria(editando.id, { nome }) : criarCategoria({ nome })));
  }

  function aoSelecionar(categoria) {
    setEditando(categoria);
    setNome(categoria.nome);
    setMensagem("");
  }

  const formulario = (
    <View style={estilos.formulario}>
      <Text style={estilos.rotulo}>{editando ? "Editar categoria" : "Nova categoria"}</Text>
      <TextInput
        style={estilos.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome da categoria"
        placeholderTextColor={cores.textoSuave}
      />
      {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}
      <View style={estilos.linhaAcoes}>
        <TouchableOpacity style={[estilos.acao, estilos.acaoPrimaria]} onPress={aoSalvar}>
          <Text style={estilos.acaoTexto}>{editando ? "Salvar" : "Adicionar"}</Text>
        </TouchableOpacity>
        {editando && (
          <>
            <TouchableOpacity style={[estilos.acao, estilos.acaoPerigo]} onPress={() => executar(() => removerCategoria(editando.id))}>
              <Text style={estilos.acaoTexto}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={limpar}>
              <Text style={estilos.acaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

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
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={formulario}
      numColumns={2}
      columnWrapperStyle={estilos.coluna}
      contentContainerStyle={estilos.lista}
      renderItem={({ item }) => {
        const quantidade = item.quantidadeJogos;
        return (
          <TouchableOpacity style={estilos.card} activeOpacity={0.85} onPress={() => abrirCategoria(item.nome)} onLongPress={() => aoSelecionar(item)}>
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
  formulario: {
    backgroundColor: cores.superficie,
    borderRadius: raio.g,
    padding: espaco.m,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  rotulo: { color: cores.texto, fontSize: 13, fontWeight: "600", marginBottom: 6 },
  input: {
    backgroundColor: cores.fundo,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  mensagem: { color: cores.aviso, marginTop: 8, fontSize: 13 },
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
  acaoPrimaria: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  acaoPerigo: { borderColor: cores.aviso },
  acaoTexto: { color: cores.texto, fontWeight: "600", fontSize: 13 },
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
