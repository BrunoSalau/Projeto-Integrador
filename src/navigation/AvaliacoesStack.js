import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AvaliacoesScreen from "../screens/avaliacoes/AvaliacoesScreen";
import NovaAvaliacaoScreen from "../screens/avaliacoes/NovaAvaliacaoScreen";
import BotaoMenu from "../componentes/BotaoMenu";
import { opcoesHeader } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function AvaliacoesStack() {
  return (
    <Stack.Navigator screenOptions={opcoesHeader}>
      <Stack.Screen
        name="ListaAvaliacoes"
        component={AvaliacoesScreen}
        options={{ title: "Avaliações", headerLeft: () => <BotaoMenu /> }}
      />
      <Stack.Screen name="NovaAvaliacao" component={NovaAvaliacaoScreen} options={{ title: "Nova avaliação" }} />
    </Stack.Navigator>
  );
}
