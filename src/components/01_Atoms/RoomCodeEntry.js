import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  View,
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";

const RoomCodeEntry = ({ roomCode, setRoomCode, navigation }) => {
  return (
    <View style={styles.RoomCodeEntry}>
      {/* entry for room code */}
      <Text style={[fonts.h1, { marginBottom: 15, alignSelf: "flex-start" }]}>
        Poll Key:
      </Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => navigation.navigate("Entry", { roomCode })}
        onChangeText={(text) => setRoomCode(text)}
        value={roomCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  RoomCodeEntry: {
    marginHorizontal: "5%",
    justifyContent: "center",
    width: "90%",
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
  },
});

export default RoomCodeEntry;
