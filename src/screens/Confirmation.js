import React, { useRef, useState } from "react";
import {
  Clipboard,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { fonts, colors } from "../styles/all_styles";

const Confirmation = ({ route, navigation }) => {
  const [copiedText, setCopiedText] = useState("");

  const roomCode = route.params.roomCode;
  const pollId = route.params.pollId;

  const copyToClipboard = () => {
    Clipboard.setString(roomCode);
  };
  //use state?

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.heading, fonts.h2]}>Thanks!</Text>
        <Text style={styles.message}>
          Thanks for submitting your answer! You will be redirected to the
          results once all the answers are in
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.roomCode}
            onPress={() => copyToClipboard()}
          >
            <Text style={styles.roomCodeText}> Copy Room Code </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.endPoll}
            onPress={() => navigation.navigate("Results", { pollId })}
          >
            <Text style={[styles.endPollText, fonts.h2]}> End Poll </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const buttonBase = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  height: 50,
  padding: 10,
};

const font16 = {
  fontSize: 16,
};

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    //this creates issues on mobile
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  endPoll: {
    ...buttonBase,
    backgroundColor: colors.primaryColor,
    color: "white",
  },
  heading: {
    ...font16,
    color: colors.primaryColor,
    fontWeight: "bold",
    marginBottom: 15,
  },
  linkText: {
    color: "white",
  },
  message: {
    ...font16,
    marginBottom: 15,
  },
  roomCode: {
    ...buttonBase,
    backgroundColor: "#bababa",
    color: "white",
  },
  wrapper: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Confirmation;
