import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/inicio/HomeScreen";
import DetalheNoticiaScreen from "../screens/inicio/DetalheNoticiaScreen";
import DetalheJogoScreen from "../screens/lancamentos/DetalheJogoScreen";
import BotaoMenu from "../componentes/BotaoMenu";
import { opcoesHeader } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function InicioStack() {
  return (
    <Stack.Navigator screenOptions={opcoesHeader}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "GameHub", headerLeft: () => <BotaoMenu /> }} />
      <Stack.Screen name="DetalheNoticia" component={DetalheNoticiaScreen} options={{ title: "Notícia" }} />
      <Stack.Screen name="DetalheJogo" component={DetalheJogoScreen} options={{ title: "Jogo" }} />
    </Stack.Navigator>
  );
}
