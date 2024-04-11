import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";

export default function Slider() {
  const [sliders, setSliders] = useState();
  useEffect(() => {
    getSliders();
  }, []);
  const getSliders = () => {
    GlobalApi.getSlider().then((result) => {
      console.log("resp", resp.sliders);
      setSliders(resp?.sliders);
    });
  };
  return (
    <View>
      <Text>Slider</Text>
    </View>
  );
}
