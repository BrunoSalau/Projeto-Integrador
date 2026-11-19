import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Linking, Alert, ActivityIndicator, StyleSheet, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { listarContatosApoio, criarContatoApoio, atualizarContatoApoio, removerContatoApoio } from "../../servicos/redeApoioApi";
import { coresApoio, espaco, raio } from "../../tema/tema";

export default function MinhaRedeApoioScreen() {
  const usuario = useSelector((state) => state.app.usuario);
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editando, setEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const carregar = useCallback(async () => {
    try {
      setErro("");
      const resultado = await listarContatosApoio();
      setContatos(resultado);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  function limparFormulario() {
    setNome(""); setParentesco(""); setTelefone(""); setEditando(null);
  }

  async function salvar() {
    if (nome.trim().length < 2 || parentesco.trim().length < 2 || telefone.trim().length < 8) {
      setErro("Preencha nome, relação e um telefone válido.");
      return;
    }
    setSalvando(true); setErro("");
    try {
      const dados = { nome: nome.trim(), parentesco: parentesco.trim(), telefone: telefone.trim() };
      if (editando) await atualizarContatoApoio(editando, dados);
      else await criarContatoApoio(dados);
      limparFormulario();
      await carregar();
    } catch (e) { setErro(e.message); }
    finally { setSalvando(false); }
  }

  function iniciarEdicao(contato) {
    setEditando(contato.id); setNome(contato.nome); setParentesco(contato.parentesco); setTelefone(contato.telefone); setErro("");
  }

  async function confirmarExclusao(contato) {
    try {
      await removerContatoApoio(contato.id);
      await carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  function excluir(contato) {
    const mensagem = `Deseja excluir ${contato.nome} da sua rede de apoio?`;

    // Alert.alert não apresenta a confirmação de forma consistente no Expo Web.
    if (Platform.OS === "web") {
      if (typeof globalThis.confirm === "function" && globalThis.confirm(mensagem)) {
        confirmarExclusao(contato);
      }
      return;
    }

    Alert.alert("Excluir contato", mensagem, [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: () => confirmarExclusao(contato) },
    ]);
  }

  function ligar(numero) {
    Linking.openURL(`tel:${numero.replace(/[^0-9+]/g, "")}`).catch(() => Alert.alert("Não foi possível abrir o discador", "Ligue diretamente para o número informado."));
  }

  if (usuario?.role !== "user") {
    return <View style={estilos.container}><Text style={estilos.aviso}>Esta área é exclusiva de contas de usuárias.</Text></View>;
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={estilos.intro}>Cadastre pessoas de confiança que você gostaria de ter à mão.</Text>
      <View style={estilos.formulario}>
        <Text style={estilos.titulo}>{editando ? "Editar contato" : "Adicionar pessoa de confiança"}</Text>
        <Text style={estilos.rotulo}>Nome</Text>
        <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Nome da pessoa" placeholderTextColor={coresApoio.textoSuave} maxLength={80} />
        <Text style={estilos.rotulo}>Parentesco ou relação</Text>
        <TextInput style={estilos.input} value={parentesco} onChangeText={setParentesco} placeholder="Ex.: mãe, irmã, amiga" placeholderTextColor={coresApoio.textoSuave} maxLength={50} />
        <Text style={estilos.rotulo}>Telefone</Text>
        <TextInput style={estilos.input} value={telefone} onChangeText={setTelefone} placeholder="(00) 00000-0000" placeholderTextColor={coresApoio.textoSuave} keyboardType="phone-pad" maxLength={25} />
        {erro !== "" && <Text style={estilos.erro}>{erro}</Text>}
        <TouchableOpacity style={estilos.botaoPrincipal} onPress={salvar} disabled={salvando}>
          {salvando ? <ActivityIndicator color="#fff" /> : <Text style={estilos.botaoPrincipalTexto}>{editando ? "Salvar alterações" : "Adicionar contato"}</Text>}
        </TouchableOpacity>
        {editando !== null && <TouchableOpacity style={estilos.botaoCancelar} onPress={limparFormulario}><Text style={estilos.botaoCancelarTexto}>Cancelar edição</Text></TouchableOpacity>}
      </View>

      <Text style={estilos.tituloLista}>Meus contatos de confiança</Text>
      {carregando ? <ActivityIndicator color={coresApoio.primaria} /> : contatos.length === 0 ? (
        <Text style={estilos.vazio}>Você ainda não cadastrou contatos.</Text>
      ) : contatos.map((contato) => (
        <View key={contato.id} style={estilos.card}>
          <View style={estilos.dadosContato}>
            <Text style={estilos.nome}>{contato.nome}</Text>
            <Text style={estilos.parentesco}>{contato.parentesco}</Text>
            <Text style={estilos.telefone}>{contato.telefone}</Text>
          </View>
          <TouchableOpacity style={estilos.acaoLigar} onPress={() => ligar(contato.telefone)} accessibilityLabel={`Ligar para ${contato.nome}`}>
            <Ionicons name="call" size={19} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={estilos.acao} onPress={() => iniciarEdicao(contato)} accessibilityLabel={`Editar ${contato.nome}`}>
            <Ionicons name="create-outline" size={21} color={coresApoio.primaria} />
          </TouchableOpacity>
          <TouchableOpacity style={estilos.acao} onPress={() => excluir(contato)} accessibilityLabel={`Excluir ${contato.nome}`}>
            <Ionicons name="trash-outline" size={20} color={coresApoio.emergencia} />
          </TouchableOpacity>
        </View>
      ))}
      <Text style={estilos.privacidade}>Seus contatos são privados e vinculados à sua conta. O cadastro não envia mensagens nem alertas automaticamente. Cadastre apenas pessoas de sua confiança.</Text>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: coresApoio.fundo },
  conteudo: { padding: espaco.m, paddingBottom: 48 },
  intro: { color: coresApoio.textoSuave, fontSize: 14, lineHeight: 20, marginBottom: espaco.m },
  formulario: { backgroundColor: coresApoio.superficie, borderRadius: raio.g, padding: espaco.m, borderWidth: 1, borderColor: coresApoio.borda, marginBottom: espaco.g },
  titulo: { color: coresApoio.texto, fontSize: 16, fontWeight: "bold", marginBottom: 14 },
  rotulo: { color: coresApoio.texto, fontSize: 13, fontWeight: "600", marginBottom: 6, marginTop: 9 },
  input: { backgroundColor: "#FFFAFC", borderRadius: raio.m, borderWidth: 1, borderColor: coresApoio.borda, paddingHorizontal: 12, paddingVertical: 11, color: coresApoio.texto, fontSize: 14 },
  botaoPrincipal: { backgroundColor: coresApoio.primaria, borderRadius: raio.m, paddingVertical: 13, alignItems: "center", marginTop: 16 },
  botaoPrincipalTexto: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  botaoCancelar: { paddingVertical: 10, alignItems: "center" },
  botaoCancelarTexto: { color: coresApoio.primaria, fontWeight: "600" },
  erro: { color: coresApoio.emergencia, fontSize: 12, marginTop: 10 },
  tituloLista: { color: coresApoio.texto, fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  vazio: { color: coresApoio.textoSuave, fontSize: 13, paddingVertical: 16 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: coresApoio.superficie, borderRadius: raio.g, borderWidth: 1, borderColor: coresApoio.borda, padding: 12, marginBottom: 10 },
  dadosContato: { flex: 1 },
  nome: { color: coresApoio.texto, fontSize: 15, fontWeight: "bold" },
  parentesco: { color: coresApoio.textoSuave, fontSize: 12, marginTop: 2 },
  telefone: { color: coresApoio.texto, fontSize: 13, marginTop: 5 },
  acaoLigar: { width: 38, height: 38, borderRadius: 19, backgroundColor: coresApoio.primaria, alignItems: "center", justifyContent: "center", marginLeft: 6 },
  acao: { width: 32, height: 38, alignItems: "center", justifyContent: "center" },
  privacidade: { color: coresApoio.textoSuave, fontSize: 11, lineHeight: 16, marginTop: 14, textAlign: "center" },
  aviso: { color: coresApoio.textoSuave, padding: espaco.m },
});
