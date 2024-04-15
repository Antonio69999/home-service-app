import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import BusinessListByCat from "../Screens/BusinessListByCatScreen/BusinessListByCat";
import BusinessDetailScreen from "../Screens/BusinessDetailScreen/BusinessDetailScreen";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="business-list" component={BusinessListByCat} />
      <Stack.Screen name="business-detail" component={BusinessDetailScreen}/>
    </Stack.Navigator>
  );
}
