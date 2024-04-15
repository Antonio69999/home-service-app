import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
import Heading from "../../Components/Heading";

export default function BusinessAboutMe({ business }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    business && (
      <View>
        <Heading text={"About Me"}></Heading>
        <Text
          style={{ fontFamily: "Outfit", color: Colors.GRAY, fontSize: 16 }}
          numberOfLines={isExpanded ? undefined : 5}
          lineHeight={20}
        >
          {isExpanded
            ? business.about
            : `${business.about.substring(0, 100)}... `}{" "}
        </Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text
            style={{
              color: Colors.PRIMARY,
              fontSize: 16,
              fontFamily: "Outfit",
            }}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}
