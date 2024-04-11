import { View, Text } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";

export default function HomeScreen() {
  return (
    <View>
      {/* HEADER */}
      <Header></Header>
      <View style={{ padding: 20 }}>
        <Slider></Slider>
        {/* Categories */}
        <Categories></Categories>
      </View>
    </View>
  );
}
