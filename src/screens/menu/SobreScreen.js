import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { limparUsuario, voltarParaFachada } from "../../redux/appSlice";
import { sair } from "../../servicos/autenticacaoApi";
import { View, Text, Image, StyleSheet } from "react-native";
import { cores, espaco } from "../../tema/tema";

export default function SobreScreen() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.app.usuario);
  function aoSair() {
    sair();
    dispatch(limparUsuario());
    dispatch(voltarParaFachada());
  }
  return (
    <View style={estilos.container}>
      <Image source={require("../../../assets/gamehub/logo.png")} style={estilos.logo} />
      <Text style={estilos.titulo}>GameHub</Text>
      <Text style={estilos.versao}>Versão 1.0.0</Text>
      <Text style={estilos.texto}>
        Portal com notícias, lançamentos, avaliações e curiosidades do universo dos jogos eletrônicos.
      </Text>
      <Text style={estilos.usuario}>Conectado como {usuario?.nome} ({usuario?.role === "admin" ? "administrador" : "usuário"})</Text>
      <TouchableOpacity style={estilos.botaoSair} onPress={aoSair}>
        <Text style={estilos.botaoSairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, alignItems: "center", padding: espaco.g, paddingTop: 40 },
  logo: { width: 96, height: 96, borderRadius: 24 },
  titulo: { color: cores.texto, fontSize: 24, fontWeight: "bold", marginTop: 14 },
  versao: { color: cores.textoSuave, fontSize: 13, marginTop: 2 },
  texto: { color: cores.texto, fontSize: 15, lineHeight: 24, textAlign: "center", marginTop: espaco.g },
  usuario: { color: cores.textoSuave, fontSize: 12, marginTop: espaco.g },
  botaoSair: { marginTop: espaco.g, paddingHorizontal: 28, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: cores.borda },
  botaoSairTexto: { color: cores.texto, fontWeight: "600" },
});
