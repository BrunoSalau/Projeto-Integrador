import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LancamentosScreen from "../screens/lancamentos/LancamentosScreen";
import DetalheJogoScreen from "../screens/lancamentos/DetalheJogoScreen";
import BotaoMenu from "../componentes/BotaoMenu";
import { opcoesHeader } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function LancamentosStack() {
  return (
    <Stack.Navigator screenOptions={opcoesHeader}>
      <Stack.Screen
        name="ListaLancamentos"
        component={LancamentosScreen}
        options={{ title: "Lançamentos", headerLeft: () => <BotaoMenu /> }}
      />
      <Stack.Screen name="DetalheJogo" component={DetalheJogoScreen} options={{ title: "Jogo" }} />
    </Stack.Navigator>
  );
}
