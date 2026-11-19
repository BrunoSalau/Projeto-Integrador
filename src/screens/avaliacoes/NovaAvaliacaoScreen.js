import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { listarJogos } from "../../servicos/jogosApi";
import { criarAvaliacao, atualizarAvaliacao } from "../../servicos/avaliacoesApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function NovaAvaliacaoScreen({ navigation, route }) {
  const usuario = useSelector((state) => state.app.usuario);
  const avaliacao = route.params?.avaliacao;
  const [jogoSelecionado, setJogoSelecionado] = useState(
    avaliacao
      ? { id: avaliacao.jogoId, nome: avaliacao.jogoNome }
      : null
  );
  const [nota, setNota] = useState(avaliacao ? String(avaliacao.nota) : "");
  const [comentario, setComentario] = useState(avaliacao ? avaliacao.comentario : "");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregandoJogos, setCarregandoJogos] = useState(false);
  const [erroJogos, setErroJogos] = useState("");
  const autor = usuario?.nome || "";

  useEffect(() => {
    let ativo = true;
    setCarregandoJogos(true);
    listarJogos()
      .then((resultado) => {
        if (ativo) setJogos(resultado);
      })
      .catch((erro) => {
        if (ativo) setErroJogos(erro.message || "Não foi possível carregar os jogos.");
      })
      .finally(() => {
        if (ativo) setCarregandoJogos(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const jogosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase();
    if (!termo) return jogos;
    return jogos.filter((item) =>
      `${item.nome} ${item.genero || ""} ${item.plataforma || ""}`.toLocaleLowerCase().includes(termo)
    );
  }, [jogos, busca]);

  function selecionarJogo(item) {
    setJogoSelecionado({ id: item.id, nome: item.nome });
    setModalVisivel(false);
    setBusca("");
    setMensagem("");
  }

  async function aoSalvar() {
    const valorNota = Number(nota);
    if (!jogoSelecionado?.id || !autor) {
      setMensagem("Selecione um jogo.");
      return;
    }
    if (nota.trim() === "" || !Number.isInteger(valorNota) || valorNota < 0 || valorNota > 10) {
      setMensagem("A nota deve ser um número inteiro entre 0 e 10.");
      return;
    }

    setSalvando(true);
    setMensagem("");
    try {
      const dados = {
        jogoId: jogoSelecionado.id,
        autor,
        nota: valorNota,
        comentario,
      };
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

  function renderizarJogo({ item }) {
    const selecionado = jogoSelecionado?.id === item.id;
    return (
      <TouchableOpacity
        style={[estilos.itemJogo, selecionado && estilos.itemJogoSelecionado]}
        activeOpacity={0.75}
        onPress={() => selecionarJogo(item)}
      >
        <View style={estilos.itemJogoTexto}>
          <Text style={estilos.nomeJogo}>{item.nome}</Text>
          <Text style={estilos.detalheJogo}>
            {[item.genero, item.plataforma].filter(Boolean).join(" · ") || "Jogo cadastrado"}
          </Text>
        </View>
        {selecionado && <Text style={estilos.check}>✓</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <>
      <ScrollView
        style={estilos.container}
        contentContainerStyle={estilos.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Jogo</Text>
          <TouchableOpacity
            style={estilos.seletor}
            activeOpacity={0.75}
            onPress={() => setModalVisivel(true)}
          >
            <Text style={jogoSelecionado ? estilos.valorSelecionado : estilos.placeholder}>
              {jogoSelecionado?.nome || "Selecione um jogo"}
            </Text>
            <Text style={estilos.seta}>⌄</Text>
          </TouchableOpacity>
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
          {salvando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={estilos.botaoTexto}>{avaliacao ? "Salvar alterações" : "Salvar"}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={estilos.modalRaiz}>
          <Pressable style={estilos.fundoModal} onPress={() => setModalVisivel(false)} />
          <View style={estilos.painelModal}>
            <View style={estilos.alcaModal} />
            <View style={estilos.cabecalhoModal}>
              <Text style={estilos.tituloModal}>Escolha um jogo</Text>
              <TouchableOpacity onPress={() => setModalVisivel(false)} hitSlop={10}>
                <Text style={estilos.fecharModal}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={estilos.busca}
              value={busca}
              onChangeText={setBusca}
              placeholder="Buscar jogo..."
              placeholderTextColor={cores.textoSuave}
              autoCorrect={false}
            />
            {carregandoJogos ? (
              <View style={estilos.estadoLista}>
                <ActivityIndicator color={cores.primaria} size="large" />
                <Text style={estilos.textoEstado}>Carregando jogos...</Text>
              </View>
            ) : erroJogos ? (
              <View style={estilos.estadoLista}>
                <Text style={estilos.textoEstado}>{erroJogos}</Text>
                <TouchableOpacity
                  style={estilos.tentarNovamente}
                  onPress={() => {
                    setErroJogos("");
                    setCarregandoJogos(true);
                    listarJogos()
                      .then(setJogos)
                      .catch((erro) => setErroJogos(erro.message || "Não foi possível carregar os jogos."))
                      .finally(() => setCarregandoJogos(false));
                  }}
                >
                  <Text style={estilos.tentarNovamenteTexto}>Tentar novamente</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={jogosFiltrados}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderizarJogo}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <Text style={estilos.textoEstado}>
                    {jogos.length === 0 ? "Nenhum jogo cadastrado em Lançamentos." : "Nenhum jogo encontrado."}
                  </Text>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </>
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
  seletor: {
    backgroundColor: cores.superficie,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholder: { color: cores.textoSuave, fontSize: 14 },
  valorSelecionado: { color: cores.texto, fontSize: 14, fontWeight: "600" },
  seta: { color: cores.textoSuave, fontSize: 20, marginTop: -5 },
  inputGrande: { height: 110, textAlignVertical: "top" },
  mensagem: { color: cores.aviso, marginBottom: 12, fontSize: 13 },
  botao: {
    backgroundColor: cores.primaria,
    borderRadius: raio.m,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  modalRaiz: { flex: 1, justifyContent: "flex-end" },
  fundoModal: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.62)" },
  painelModal: {
    backgroundColor: cores.fundo,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: espaco.m,
    paddingTop: 10,
    paddingBottom: 28,
    height: "78%",
    borderWidth: 1,
    borderColor: cores.borda,
  },
  alcaModal: {
    alignSelf: "center",
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: cores.borda,
    marginBottom: 16,
  },
  cabecalhoModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  tituloModal: { color: cores.texto, fontSize: 18, fontWeight: "bold" },
  fecharModal: { color: cores.textoSuave, fontSize: 20, paddingHorizontal: 4 },
  busca: {
    backgroundColor: cores.superficie,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
    marginBottom: 12,
    fontSize: 14,
  },
  itemJogo: {
    backgroundColor: cores.superficie,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.borda,
    padding: 13,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemJogoSelecionado: { borderColor: cores.primaria },
  itemJogoTexto: { flex: 1 },
  nomeJogo: { color: cores.texto, fontSize: 14, fontWeight: "600" },
  detalheJogo: { color: cores.textoSuave, fontSize: 12, marginTop: 4 },
  check: { color: cores.primaria, fontSize: 20, fontWeight: "bold", marginLeft: 12 },
  estadoLista: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  textoEstado: { color: cores.textoSuave, textAlign: "center", fontSize: 13, marginTop: 10 },
  tentarNovamente: {
    marginTop: 12,
    backgroundColor: cores.superficie,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  tentarNovamenteTexto: { color: cores.texto, fontWeight: "600", fontSize: 13 },
});
