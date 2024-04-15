import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import Colors from "../../Utils/Colors";
import BackBtn from "../../Components/BackBtn";

export default function BusinessListByCat() {
  const param = useRoute().params;

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
      <BackBtn title={param.category}></BackBtn>
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
