import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { fonts, colors } from "../styles/all_styles";
import { firebase } from "../../utils/firebase";
import Header from "../components/01_Atoms/Header";
import winner from "../../utils/winner";
import Stars from "react-native-stars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import ResultSection from "../components/02_Molecules/ResultSection";

const Results = ({ route, navigation }) => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [win, setWin] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [voteCount, setVoteCount] = useState(route.params.count); // how many votes are in
  var roomCode = route.params.roomCode;
  let pollId;

  if (!route.params) {
    pollId = "-MKq65RirJuEavylaDax";
  } else {
    pollId = route.params.pollId;
  }

  // for copying room code to clipboard
  const copyToClipboard = () => {
    console.log("called copy");
    Clipboard.setString(roomCode);
    setCopiedCode(true);
  };

  // change back button to a home button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ marginLeft: "10px" }}
        >
          <MaterialCommunityIcons name="home" size={25} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: "10px",
          }}
        >
          <Text style={fonts.p}>Room Code: {roomCode}</Text>
          <TouchableOpacity onPress={() => copyToClipboard()}>
            <Icon name="clipboard" type="material-community" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  // getting all vote data from pollId
  useEffect(() => {
    setIsLoading(true);
    const db = firebase.database().ref("polls/" + pollId);

    const handleData = (snap) => {
      if (snap.val()) setPollData(snap.val());
      setIsLoading(false);
    };

    db.on("value", handleData, (error) => console.log(error));

    return () => {
      db.off("value", handleData);
    };
  }, []);

  // calls util function for placement of options
  useEffect(() => {
    if (pollData != null) setWin(winner(pollData));
  }, [pollData]);

  // logic for the vote count
  useEffect(() => {
    const db = firebase
      .database()
      .ref("polls/" + pollId)
      .child("count");

    const handleData = (snap) => {
      if (snap.val()) {
        setVoteCount(snap.val());
      }
    };

    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {win == null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.voteCountContainer}>
            {copiedCode ? (
              <Text style={{ textAlign: "center" }}>Room Code Copied!</Text>
            ) : null}
          </View>
          <View style={styles.voteCountContainer}>
            <Text style={fonts.p}> Vote Count: </Text>
            <Text style={[fonts.p, styles.voteCount]}> {voteCount} </Text>
          </View>
          <View style={styles.promptContainer}>
            <Text style={[fonts.h2]}>Prompt</Text>
            <Text style={fonts.p}>{pollData.prompt}</Text>
          </View>

          <Text style={[fonts.h2, { marginBottom: 10 }]}>Winner</Text>
          {win.map((option) => (
            (option.win)?
            <ResultSection data={option}/> : null))}

          <View style={styles.divider} />

          <Text style={[fonts.h2, { marginBottom: 10, color: "grey" }]}>
            Other Results
          </Text>
          {win.map((option) => (
            (!option.win)?
            <ResultSection headerColor={"#A9A9A9"} headerTextColor={"white"} data={option} other={true}/> : null
          ))}
        </View>
      )}
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

const styles = StyleSheet.create({
  divider: {
    marginVertical: 20,
    marginBottom: 35,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    opacity: 0.5,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    marginHorizontal: "5%",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  promptContainer: {
    marginBottom: 20,
  },
  contentContainer: {
    padding: 20,
  },
  roomCode: {
    ...buttonBase,
    backgroundColor: "#bababa",
    color: "white",
  },
  voteCountContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  voteCount: {
    color: colors.primaryColor,
    fontWeight: "bold",
  },
});

export default Results;
