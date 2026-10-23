import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { voltarParaFachada } from "../../redux/appSlice";
import { coresApoio, espaco, raio } from "../../tema/tema";

const canais = [
  { numero: "180", nome: "Central de Atendimento à Mulher", cor: coresApoio.primaria },
  { numero: "190", nome: "Polícia Militar", cor: coresApoio.emergencia },
];

function ligar(numero) {
  Linking.openURL(`tel:${numero}`).catch(() =>
    Alert.alert("Não foi possível abrir o discador", `Disque ${numero} diretamente no telefone.`)
  );
}

export default function AreaApoioScreen() {
  const dispatch = useDispatch();

  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.conteudo}>
      <Text style={estilos.intro}>Canais oficiais de ajuda, a um toque de distância.</Text>

      {canais.map((canal) => (
        <View key={canal.numero} style={estilos.card}>
          <Text style={estilos.nome}>{canal.nome}</Text>
          <Text style={[estilos.numero, { color: canal.cor }]}>{canal.numero}</Text>
          <TouchableOpacity style={[estilos.botaoLigar, { backgroundColor: canal.cor }]} onPress={() => ligar(canal.numero)}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={estilos.botaoLigarTexto}>Ligar para o {canal.numero}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={estilos.aviso}>
        Protótipo acadêmico. Este aplicativo não substitui atendimento policial, jurídico, psicológico ou de saúde.
      </Text>

      <TouchableOpacity style={estilos.botaoSair} onPress={() => dispatch(voltarParaFachada())}>
        <Ionicons name="exit-outline" size={20} color={coresApoio.primaria} />
        <Text style={estilos.botaoSairTexto}>Saída rápida</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: coresApoio.fundo },
  conteudo: { padding: espaco.m, paddingBottom: 40 },
  intro: { color: coresApoio.textoSuave, fontSize: 15, marginBottom: espaco.m },
  card: {
    backgroundColor: coresApoio.superficie,
    borderRadius: raio.g,
    padding: espaco.m,
    marginBottom: espaco.m,
    alignItems: "center",
    borderWidth: 1,
    borderColor: coresApoio.borda,
  },
  nome: { color: coresApoio.texto, fontSize: 16, fontWeight: "bold", textAlign: "center" },
  numero: { fontSize: 44, fontWeight: "bold", marginVertical: 6 },
  botaoLigar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: raio.m,
    paddingVertical: 14,
  },
  botaoLigarTexto: { color: "#fff", fontWeight: "bold", fontSize: 16, marginLeft: 8 },
  aviso: { color: coresApoio.textoSuave, fontSize: 12, lineHeight: 18, textAlign: "center", marginVertical: espaco.m },
  botaoSair: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: raio.m,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: coresApoio.primaria,
  },
  botaoSairTexto: { color: coresApoio.primaria, fontWeight: "bold", fontSize: 16, marginLeft: 8 },
});
