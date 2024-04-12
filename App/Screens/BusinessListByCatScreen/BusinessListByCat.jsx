import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import back from "../../../assets/icons/left.png";

export default function BusinessListByCat() {
  const param = useRoute().params;
  useEffect(() => {
    // console.log("Category", param.category);
  }, []);

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image source={back} style={{ width: 30, height: 30 }}></Image>
        <Text style={{ fontSize: 25 }}>{param?.category}</Text>
      </TouchableOpacity>
    </View>
  );
}
