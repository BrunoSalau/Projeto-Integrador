import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { cores } from "../tema/tema";

export default function BotaoMenu() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={estilo.espaçamento} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} hitSlop={10}>
      <Ionicons name="menu" size={26} color={cores.texto} />
    </TouchableOpacity>
  );
}

const estilo = StyleSheet.create({
  espaçamento:{
    marginLeft: 15
  }
})
