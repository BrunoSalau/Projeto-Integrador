import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { cores, espaco, raio } from "../../tema/tema";
import { entrar, cadastrar } from "../../servicos/autenticacaoApi";
import { definirUsuario } from "../../redux/appSlice";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoEnviar() {
    setMensagem("");
    setCarregando(true);
    try {
      const resposta = modoCadastro
        ? await cadastrar(nome, email, senha)
        : await entrar(email, senha);
      dispatch(definirUsuario(resposta.usuario));
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
      <View style={estilos.formulario}>
        <Image source={require("../../../assets/gamehub/logo.png")} style={estilos.logo} resizeMode="contain" />
        <Text style={estilos.titulo}>GameHub</Text>
        {modoCadastro && <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Nome</Text>
          <TextInput style={estilos.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" placeholderTextColor={cores.textoSuave} autoCapitalize="words" />
        </View>}
        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>E-mail</Text>
          <TextInput style={estilos.input} value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" placeholderTextColor={cores.textoSuave} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
        </View>
        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Senha</Text>
          <TextInput style={estilos.input} value={senha} onChangeText={setSenha} placeholder="Mínimo de 8 caracteres" placeholderTextColor={cores.textoSuave} secureTextEntry autoCapitalize="none" />
        </View>
        {mensagem !== "" && <Text style={estilos.mensagem}>{mensagem}</Text>}
        <TouchableOpacity style={estilos.botao} activeOpacity={0.8} onPress={aoEnviar} disabled={carregando}>
          <Text style={estilos.botaoTexto}>{carregando ? "Aguarde..." : modoCadastro ? "Criar conta" : "Entrar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setModoCadastro(!modoCadastro); setMensagem(""); }} style={estilos.alternar}>
          <Text style={estilos.esqueciSenha}>{modoCadastro ? "Já tenho uma conta. Entrar" : "Não tem conta? Criar conta"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: "center",
    padding: espaco.m,
  },
  formulario: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: espaco.p,
  },
  titulo: {
    color: cores.texto,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: espaco.g,
  },
  campo: {
    marginBottom: espaco.m,
  },
  rotulo: {
    color: cores.texto,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: espaco.p,
  },
  input: {
    backgroundColor: cores.superficie,
    borderRadius: raio.m,
    paddingHorizontal: espaco.m,
    paddingVertical: espaco.m,
    fontSize: 14,
    color: cores.texto,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botao: {
    width: "100%",
    backgroundColor: cores.primaria,
    borderRadius: raio.m,
    paddingVertical: espaco.m,
    alignItems: "center",
    marginTop: espaco.p,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  esqueciSenha: {
    color: cores.textoSuave,
    fontSize: 13,
    textAlign: "center",
    marginTop: espaco.m,
  },
  mensagem: { color: cores.aviso, fontSize: 13, textAlign: "center", marginBottom: espaco.m },
  alternar: { paddingVertical: espaco.m },
});