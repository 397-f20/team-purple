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
import { firebase } from "../../../utils/firebase";

const RoomCodeEntry = ({ roomCode, setRoomCode, navigation }) => {
  // takes you to Entry.js if room code exists, display error if not
  async function handleSubmit() {
    // check if room code exists in the db
    const db = firebase.database().ref("polls").orderByChild("roomCode");
    await db.equalTo(roomCode).once("value", (snapshot) => {
      // if room code exists
      if (snapshot.exists()) {
        console.log("Going to room ", roomCode)
        navigation.navigate("Entry", { roomCode })
      } else {
        console.log("Room Code Invalid")
      }
    });
  }

  return (
    <View style={styles.RoomCodeEntry}>
      {/* entry for room code */}
      <Text style={[fonts.h1, { marginBottom: 15, alignSelf: "flex-start" }]}>
        Poll Key:
      </Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => handleSubmit()}
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
