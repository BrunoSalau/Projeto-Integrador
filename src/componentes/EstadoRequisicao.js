import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { cores, espaco, raio } from "../tema/tema";

export default function EstadoRequisicao({ carregando, erro, aoTentar }) {
  return (
    <View style={estilos.container}>
      {carregando && !erro ? (
        <ActivityIndicator size="large" color={cores.destaque} />
      ) : (
        <>
          <Text style={estilos.mensagem}>{erro}</Text>
          <TouchableOpacity style={estilos.botao} onPress={aoTentar} activeOpacity={0.8}>
            <Text style={estilos.botaoTexto}>Tentar novamente</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, alignItems: "center", justifyContent: "center", padding: espaco.g },
  mensagem: { color: cores.aviso, fontSize: 14, textAlign: "center", marginBottom: espaco.m },
  botao: { backgroundColor: cores.primaria, borderRadius: raio.m, paddingVertical: 12, paddingHorizontal: espaco.g },
  botaoTexto: { color: "#fff", fontWeight: "bold", fontSize: 14 },
});
