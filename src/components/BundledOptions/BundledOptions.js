import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";

const BundledOptions = () => {
  return (
    <View style={styles.container}>
      <Text>This is bundled options</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginVertical: 20,
  },
});

export default BundledOptions;
