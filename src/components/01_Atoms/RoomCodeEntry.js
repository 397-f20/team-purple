import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  TextInput,
  View,
  AsyncStorage,
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";
import { firebase } from "../../../utils/firebase";

const RoomCodeEntry = ({ roomCode, setRoomCode, navigation }) => {
  // takes you to Entry.js if room code exists, display error if not

  const [errorMessage, setErrorMesssage] = useState(null);

  async function handleSubmit() {
    // check if room code exists in the db
    const db = firebase.database().ref("polls").orderByChild("roomCode");
    await db.equalTo(roomCode).once("value", (snapshot) => {
      // if room code exists
      if (snapshot.exists()) {
        console.log(Object.keys(snapshot.val())[0]);
        console.log("Going to room ", roomCode);
        navigation.navigate("Entry", { roomCode });
      } else {
        setErrorMesssage("Room Code Invalid");
        console.log("Room Code Invalid");
      }
    });
  }

  // useEffect(() => {
  //   setIsLoading(true);
  //   const db = firebase
  //     .database()
  //     .ref("polls")
  //     .orderByChild("roomCode")
  //     .equalTo(roomCode);

  //   const handleData = (snap) => {
  //     if (snap.val()) {
  //       setPollId(Object.keys(snap.val())[0]);
  //     }
  //     setIsLoading(false);
  //   };

  //   db.on("value", handleData, (error) => console.log(error));
  //   return () => {
  //     db.off("value", handleData);
  //   };
  // }, []);

  async function seeResults() {
    // check if room code exists in the db
    const db = firebase.database().ref("polls").orderByChild("roomCode");
    await db.equalTo(roomCode).once("value", (snapshot) => {
      // if room code exists
      if (snapshot.exists()) {
        const pollId = Object.keys(snapshot.val())[0];
        console.log("Going to room ", roomCode);
        navigation.navigate("Results", { pollId, roomCode });
      } else {
        setErrorMesssage("Room Code Invalid");
        console.log("Room Code Invalid");
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
      <Button onPress={() => handleSubmit()} title="Enter Poll"></Button>
      <Text
        style={[{ alignSelf: "center", marginTop: 10 }]}
        onPress={() => seeResults()}
      >
        Already voted? Click here to see results!
      </Text>
      {errorMessage && (
        <Text style={[{ marginTop: 10, color: "red" }]}>{errorMessage}</Text>
      )}
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
    marginBottom: 10,
  },
});

export default RoomCodeEntry;
