import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AreaApoioScreen from "../screens/apoio/AreaApoioScreen";
import { coresApoio } from "../tema/tema";

const Stack = createNativeStackNavigator();

export default function AreaApoioStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: coresApoio.primaria },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: coresApoio.fundo },
      }}
    >
      <Stack.Screen name="AreaApoio" component={AreaApoioScreen} options={{ title: "Área de Apoio" }} />
    </Stack.Navigator>
  );
}
