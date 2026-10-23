import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabsFachada from "./TabsFachada";
import CategoriasScreen from "../screens/menu/CategoriasScreen";
import SobreScreen from "../screens/menu/SobreScreen";
import { cores } from "../tema/tema";

const Drawer = createDrawerNavigator();

export default function FachadaDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.superficie },
        headerTintColor: cores.texto,
        headerTitleStyle: { fontWeight: "bold" },
        drawerStyle: { backgroundColor: cores.superficie },
        drawerActiveTintColor: cores.destaque,
        drawerInactiveTintColor: cores.textoSuave,
        sceneStyle: { backgroundColor: cores.fundo },
      }}
    >
      <Drawer.Screen
        name="Portal"
        component={TabsFachada}
        options={{
          headerShown: false,
          title: "Portal",
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Categorias"
        component={CategoriasScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="grid-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={SobreScreen}
        options={{
          title: "Sobre o GameHub",
          drawerIcon: ({ color }) => <Ionicons name="information-circle-outline" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
