import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Components/Heading";

export default function Slider() {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then((resp) => {
      // console.log("Full response", resp);
      setSliders(resp?.sliders);
    });
  };

  return (
    <View>
      <Heading text={"Offer For You"}></Heading>
      <FlatList
        data={sliders}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 20, overflow: "hidden" }}>
            <Image
              source={{ uri: item.image?.url }}
              style={styles.sliderImage}
              resizeMode="contain"
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  sliderImage: {
    width: 270,
    height: 150,
    borderRadius: 35,
  },
});
