import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import { voltarParaFachada } from "../../redux/appSlice";
import useCarregar from "../../servicos/useCarregar";
import { listarIndicadores } from "../../servicos/indicadoresApi";
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

function formatar(numero) {
  return String(numero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function AreaApoioScreen({ navigation }) {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.app.usuario);
  const { dados: indicadores, carregando, erro, recarregar } = useCarregar(listarIndicadores);

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

      {usuario?.role === "user" && (
        <TouchableOpacity style={estilos.botaoRede} onPress={() => navigation.navigate("MinhaRedeApoio")}>
          <Ionicons name="people-outline" size={21} color="#fff" />
          <Text style={estilos.botaoRedeTexto}>Minha Rede de Apoio</Text>
          <Ionicons name="chevron-forward" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={estilos.botaoSair} onPress={() => dispatch(voltarParaFachada())}>
        <Ionicons name="exit-outline" size={20} color={coresApoio.primaria} />
        <Text style={estilos.botaoSairTexto}>Saída rápida</Text>
      </TouchableOpacity>

      <View style={estilos.indicadores}>
        <Text style={estilos.indicadoresTitulo}>Contexto regional</Text>
        <Text style={estilos.indicadoresAviso}>
          Estimativa acadêmica, agregada por região, a partir de dados públicos do Atlas da Violência (Ipea). Não indica risco individual e não substitui os serviços oficiais.
        </Text>

        {indicadores === null && carregando && <ActivityIndicator color={coresApoio.primaria} />}

        {indicadores === null && !carregando && (
          <TouchableOpacity onPress={recarregar}>
            <Text style={estilos.indicadoresErro}>Indicadores indisponíveis no momento. Toque para tentar de novo.</Text>
          </TouchableOpacity>
        )}

        {indicadores !== null &&
          indicadores.map((item) => (
            <View key={item.id} style={estilos.indicadorLinha}>
              <Text style={estilos.indicadorRegiao}>{item.regiao}</Text>
              <Text style={estilos.indicadorTexto}>
                {formatar(item.observado)} registros em {item.anoObservado} · estimativa {item.anoEstimado}: {formatar(item.estimado)} (± {formatar(item.margem)})
              </Text>
            </View>
          ))}

        {indicadores !== null && (
          <Text style={estilos.indicadoresFonte}>Modelo: {indicadores[0]?.modelo}. A margem é o erro médio absoluto da validação cruzada. A vantagem deste modelo sobre simplesmente repetir o último ano é pequena e não conclusiva; use apenas como contexto aproximado.</Text>
        )}
      </View>
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
  indicadores: {
    backgroundColor: coresApoio.superficie,
    borderRadius: raio.g,
    padding: espaco.m,
    marginTop: espaco.m,
    borderWidth: 1,
    borderColor: coresApoio.borda,
  },
  indicadoresTitulo: { color: coresApoio.texto, fontSize: 16, fontWeight: "bold" },
  indicadoresAviso: { color: coresApoio.textoSuave, fontSize: 12, lineHeight: 18, marginTop: 4, marginBottom: 10 },
  indicadoresErro: { color: coresApoio.primaria, fontSize: 13 },
  indicadorLinha: { paddingVertical: 8, borderTopWidth: 1, borderTopColor: coresApoio.borda },
  indicadorRegiao: { color: coresApoio.texto, fontWeight: "600", fontSize: 14 },
  indicadorTexto: { color: coresApoio.textoSuave, fontSize: 12, marginTop: 2 },
  indicadoresFonte: { color: coresApoio.textoSuave, fontSize: 11, marginTop: 10 },
  botaoRede: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, backgroundColor: coresApoio.primaria, borderRadius: raio.m, paddingVertical: 14, marginBottom: espaco.m },
  botaoRedeTexto: { color: "#fff", fontSize: 15, fontWeight: "bold", flex: 1, textAlign: "center" },
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
