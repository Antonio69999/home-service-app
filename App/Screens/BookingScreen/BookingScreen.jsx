import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import BusinessListItem from "../BusinessListByCatScreen/BusinessListItem";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { set } from "date-fns";

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    user && getUserBooking();
  }, [user]);
  const getUserBooking = () => {
    setRefreshing(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        setBookingList(resp.bookings);
        setRefreshing(false);
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "Outfit-Medium", fontSize: 26 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          data={bookingList}
          onRefresh={() => getUserBooking()}
          refreshing={refreshing}
          renderItem={({ item, index }) => {
            if (item.businessList) {
              return (
                <BusinessListItem
                  business={item?.businessList}
                  status={item?.bookingStatus}
                  booking={item}
                ></BusinessListItem>
              );
            } else {
              return null; // Or return some placeholder component
            }
          }}
        ></FlatList>
      </View>
    </View>
  );
}
