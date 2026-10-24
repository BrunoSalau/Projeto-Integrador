import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import InicioStack from "./InicioStack";
import LancamentosStack from "./LancamentosStack";
import AvaliacoesStack from "./AvaliacoesStack";
import MeusJogosStack from "./MeusJogosStack";
import { cores } from "../tema/tema";

const Tab = createBottomTabNavigator();

function icone(nome) {
  return ({ focused, color }) => <Ionicons name={focused ? nome : `${nome}-outline`} size={22} color={color} />;
}

export default function TabsFachada() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: cores.superficie, borderTopColor: cores.borda },
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.textoSuave,
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Tab.Screen 
      name="TabInicio" 
      component={InicioStack} 
      options={{ tabBarLabel: "Início", tabBarIcon: icone("home") }} 
      />
      <Tab.Screen
        name="TabLancamentos"
        component={LancamentosStack}
        options={{ tabBarLabel: "Lançamentos", tabBarIcon: icone("rocket") }}
      />
      <Tab.Screen
        name="TabAvaliacoes"
        component={AvaliacoesStack}
        options={{ tabBarLabel: "Avaliações", tabBarIcon: icone("star") }}
      />
      <Tab.Screen
        name="TabMeusJogos"
        component={MeusJogosStack}
        options={{ tabBarLabel: "Meus Jogos", tabBarIcon: icone("game-controller") }}
      />
    </Tab.Navigator>
  );
}
