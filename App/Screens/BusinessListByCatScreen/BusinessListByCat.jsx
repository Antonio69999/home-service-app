import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import Colors from "../../Utils/Colors";

export default function BusinessListByCat() {
  const param = useRoute().params;
  const navigation = useNavigation();

  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    param && getBusinesByCategory();
  }, [param]);

  const getBusinesByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((resp) => {
      setBusinessList(resp.businessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
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
        <Text style={{ fontSize: 25 }}>{param?.category}</Text>
      </TouchableOpacity>
      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 20 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <BusinessListItem business={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "Outfit-Medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: "20%",
            color: Colors.GRAY,
          }}
        >
          No business found
        </Text>
      )}
    </View>
  );
}
