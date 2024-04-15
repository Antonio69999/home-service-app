import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";
import { Entypo } from "@expo/vector-icons";
import BusinessPhoto from "./BusinessPhoto";
import BusinessAboutMe from "./BusinessAboutMe";
import BookingModal from "./BookingModal";

export default function BusinessDetailScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {});
  return (
    business && (
      <View>
        <ScrollView style={{ height: "93%" }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: business?.images[0]?.url }}
            style={{ width: "100%", height: 300 }}
          ></Image>
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "Outfit-Bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "Outfit-Medium",
                  fontSize: 20,
                  color: Colors.PRIMARY,
                }}
              >
                {business?.contactPerson} 🌟
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 14,
                }}
              >
                {business?.category.name}
              </Text>
            </View>
            <Text
              style={{ fontSize: 17, fontFamily: "Outfit", color: Colors.GRAY }}
            >
              <Entypo
                name="location-pin"
                size={25}
                color={Colors.PRIMARY}
                style={{ marginRight: 10 }}
              />
              {business?.adress}
            </Text>
            {/* Hirizontal Line */}
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            <BusinessAboutMe business={business}></BusinessAboutMe>

            {/* Hirizontal Line */}
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            <BusinessPhoto business={business}></BusinessPhoto>
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 8,
            gap: 8,
          }}
        >
          <TouchableOpacity style={styles.messageBtn}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Outfit-Medium",
                color: Colors.PRIMARY,
                fontSize: 18,
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Outfit-Medium",
                color: Colors.WHITE,
                fontSize: 18,
              }}
            >
              Book
            </Text>
          </TouchableOpacity>
        </View>
        {/* Booking Screen Modal */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
            businessId={business.id}
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messageBtn: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
