import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function BusinessListItem({ business, booking }) {
  // console.log(business);
  const navigation = useNavigation();
  if (!business) {
    return null; // or return a loading spinner, or some placeholder content
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.push("business-detail", { business: business })}
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "Outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business.contactPerson
            ? business.contactPerson
            : "No contact person available"}
        </Text>
        <Text style={{ fontFamily: "Outfit-Bold", fontSize: 19 }}>
          {business.name}
        </Text>
        <Text
          style={{ fontFamily: "Outfit", color: Colors.GRAY, fontSize: 16 }}
        >
          <Entypo
            name="location-pin"
            size={20}
            color={Colors.PRIMARY}
            style={{ marginRight: 10 }}
          />
          {business.adress}
        </Text>
        {/* {booking?.id ? <Text>Show Booking</Text> : null} */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
