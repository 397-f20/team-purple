import { StyleSheet } from "react-native";
import { colors } from "./colors";

const fonts = StyleSheet.create({
  h1: {
    fontSize: 22,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondaryColor,
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondaryColor,
  },
  p: {
    fontSize: 16,
  },
});

export { fonts };
