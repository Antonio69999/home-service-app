import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { React, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

export default function BookingModal({ businessId, hideModal }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getTime();
  }, []);
  const getTime = () => {
    const timeList = [];
    let i;
    for (i = 8; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
    }
    timeList.push({ time: i + ":30 AM" });
    for (i = 1; i <= 7; i++) {
      timeList.push({ time: i + ":00 PM" });
    }
    timeList.push({ time: i + ":30 PM" });
    setTimeList(timeList);
  };

  //Create Booking method
  const createNewBooking = () => {
    if (!selectedTime || !selectedDate || !businessId) {
      ToastAndroid.show(
        "Please select date, time, and business",
        ToastAndroid.LONG
      );
      return;
    }
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date: selectedDate,
      note: note,
      businessId: businessId,
    };
    if (data.businessId) {
      GlobalApi.createBooking(data)
        .then((resp) => {
          console.log("resp", resp);
          ToastAndroid.show("Booking Created Successfully", ToastAndroid.LONG);
        })
        .catch((error) => {
          console.error("Error creating booking: ", error);
          ToastAndroid.show("Error creating booking", ToastAndroid.LONG);
        });
    } else {
      console.error("businessId is undefined");
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={() => hideModal()}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={{ fontSize: 25 }}>Booking</Text>
        </TouchableOpacity>
        {/* Calendar Section */}
        <Heading text={"Select Date"}></Heading>
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={onDateChange}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Colors.PRIMARY}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.BLACK}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>
        {/* Time Select Section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time Slot"}></Heading>
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 5 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unselectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* Note Section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note "}></Heading>
          <TextInput
            placeholder="Note"
            style={styles.noteText}
            numberOfLines={4}
            multiline={true}
            onChange={(text) => setNote(text)}
          />
        </View>
        {/* Submit button */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 15,
    padding: 20,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT,
    borderRadius: 99,
    paddingHorizontal: 15,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },

  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY_LIGHT,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: Colors.PRIMARY,
  },
  noteText: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "Outfit",
    borderColor: Colors.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "Outfit-Medium",
    fontSize: 17,
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
    padding: 13,
    borderRadius: 99,
    elevation: 2,
  },
});
