import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function BackBtn({ title }) {
  const param = useRoute().params;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
      <Text style={{ fontSize: 25 }}>{title}</Text>
    </TouchableOpacity>
  );
}
