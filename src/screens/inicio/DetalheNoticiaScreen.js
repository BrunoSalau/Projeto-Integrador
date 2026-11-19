import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import EstadoRequisicao from "../../componentes/EstadoRequisicao";
import useCarregar from "../../servicos/useCarregar";
import { buscarNoticia, removerNoticia } from "../../servicos/noticiasApi";
import { cores, espaco, raio } from "../../tema/tema";

export default function DetalheNoticiaScreen({ navigation, route }) {
  const usuario = useSelector((state) => state.app.usuario);
  const noticiaId = route.params.noticiaId;
  const [confirmando, setConfirmando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const { dados: noticia, carregando, erro, recarregar } = useCarregar(() => buscarNoticia(noticiaId), noticiaId);

  if (noticia === null) {
    return <EstadoRequisicao carregando={carregando} erro={erro} aoTentar={recarregar} />;
  }

  async function aoExcluir() {
    try {
      await removerNoticia(noticia.id);
      navigation.goBack();
    } catch (e) {
      setConfirmando(false);
      setMensagem(e.message);
    }
  }

  return (
    <ScrollView style={estilos.container}>
      <Image source={noticia.capa} style={estilos.imagem} resizeMode="cover" />
      <View style={estilos.corpo}>
        <Text style={estilos.categoria}>{noticia.categoria}</Text>
        <Text style={estilos.titulo}>{noticia.titulo}</Text>
        <Text style={estilos.data}>{noticia.data}</Text>
        <Text style={estilos.texto}>{noticia.texto}</Text>

        {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}

        {usuario?.role === "admin" && (confirmando ? (
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
            <TouchableOpacity style={estilos.acao} onPress={() => navigation.navigate("NovaNoticia", { noticia })}>
              <Text style={estilos.acaoTexto}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.acao} onPress={() => setConfirmando(true)}>
              <Text style={estilos.acaoTexto}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
  imagem: { width: "100%", height: 220 },
  corpo: { padding: espaco.m },
  categoria: { color: cores.destaque, fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: "bold", marginTop: 6 },
  data: { color: cores.textoSuave, fontSize: 12, marginTop: 4, marginBottom: espaco.m },
  texto: { color: cores.texto, fontSize: 15, lineHeight: 24 },
  mensagem: { color: cores.aviso, marginTop: 12, fontSize: 13 },
  linhaAcoes: { flexDirection: "row", marginTop: espaco.g },
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
