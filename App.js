import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/redux/store";
import RaizNavegacao from "./src/navigation/RaizNavegacao";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RaizNavegacao />
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </Provider>
  );
}
