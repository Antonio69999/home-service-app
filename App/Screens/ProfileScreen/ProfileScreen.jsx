import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";

export default function ProfileScreen({ navigation }) {
  const { user } = useUser();
  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
      screen: "Home",
    },
    {
      id: 2,
      name: "My Bookings",
      icon: "bookmark-sharp",
      screen: "Booking",
    },
    {
      id: 3,
      name: "Logout",
      icon: "log-out",
    },
  ];

  return (
    <View>
      <View
        style={{ padding: 20, paddingTop: 30, backgroundColor: Colors.PRIMARY }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Outfit-Bold",
            color: Colors.WHITE,
          }}
        >
          {" "}
          Profile
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          ></Image>
          <Text
            style={{
              fontSize: 26,
              marginTop: 8,
              fontFamily: "Outfit-Medium",
              marginTop: 8,
              color: Colors.WHITE,
            }}
          >
            {user.fullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              marginTop: 8,
              fontFamily: "Outfit-Medium",
              marginTop: 8,
              color: Colors.WHITE,
            }}
          >
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>
      <View style={{ paddingTop: 100 }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 40,
                paddingHorizontal: 80,
              }}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: "Outfit", fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
}
