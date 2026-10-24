import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MeusJogosScreen from "../screens/meusjogos/MeusJogosScreen";
import BotaoMenu from "../componentes/BotaoMenu";
import { opcoesHeader } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function MeusJogosStack() {
  return (
    <Stack.Navigator screenOptions={opcoesHeader}>
      <Stack.Screen name="MeusJogos" component={MeusJogosScreen} options={{ title: "Meus Jogos", headerLeft: () => <BotaoMenu /> }} />
    </Stack.Navigator>
  );
}
