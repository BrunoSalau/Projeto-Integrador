import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import { cores, espaco, raio } from "../../tema/tema";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const navigation = useNavigation();
  return (
    <ScrollView
      style={estilos.container}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
    >
      <View style={estilos.formulario}>
        <Image
          source={require("../../../assets/gamehub/logo.png")}
          style={estilos.logo}
          resizeMode="contain"
        />

        <Text style={estilos.titulo}>GameHub</Text>

        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>E-mail</Text>
          <TextInput
            style={estilos.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor={cores.textoSuave}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={estilos.campo}>
          <Text style={estilos.rotulo}>Senha</Text>
          <TextInput
            style={estilos.input}
            placeholder="Digite sua senha"
            placeholderTextColor={cores.textoSuave}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
            style={estilos.botao}
            activeOpacity={0.8}
            onPress={() => navigation.replace("Principal")}
            >
            <Text style={estilos.botaoTexto}>Entrar</Text>
        </TouchableOpacity>

        <Text style={estilos.esqueciSenha}>Esqueci minha senha</Text>
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
});