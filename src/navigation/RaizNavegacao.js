import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/login";
import FachadaDrawer from "./FachadaDrawer";
import AreaApoioStack from "./AreaApoioStack";

const Stack = createNativeStackNavigator();

export default function RaizNavegacao() {
  const modo = useSelector((state) => state.app.modo);
  const usuario = useSelector((state) => state.app.usuario);
  const TelaPrincipal = modo === "apoio" ? AreaApoioStack : FachadaDrawer;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <Stack.Screen name="Principal" component={TelaPrincipal} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
