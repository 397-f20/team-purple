import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { fonts, colors } from "../../styles/all_styles";

const Header = ({ route, navigation, title, backgroundColor, textColor }) => {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.primaryColor,
        },
      ]}
    >
      <Text
        style={[
          fonts.h2,
          { color: textColor ? textColor : colors.secondaryColor },
        ]}
      >
        {title}
      </Text>
      {/* <TouchableOpacity
          onPress={() => navigation.navigate("Description")}
        >
          <Text style={[fonts.h2, { fontWeight: "normal" }]}>more</Text>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Header;
