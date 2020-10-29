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
} from "react-native";
import { fonts, colors } from "../styles/all_styles";
import { firebase } from "../../utils/firebase";
import Header from "../components/01_Atoms/Header";
import winner from "../../utils/winner";
import Stars from "react-native-stars";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const Results = ({ route, navigation }) => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [win, setWin] = useState(null);
  let pollId;
  if (!route.params) {
    pollId = "-MJ-uZfinnyI0wP1jAH1";
  } else {
    pollId = route.params.pollId;
  }

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

  useEffect(() => {
    if (win == null && pollData != null) setWin(winner(pollData));
  }, [pollData]);

  return (
    <SafeAreaView style={styles.container}>
      {win == null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.promptContainer}>
            <Text style={[fonts.h2]}>Prompt</Text>
            <Text style={fonts.p}>{pollData.prompt}</Text>
          </View>

          <Text style={[fonts.h2, { marginBottom: 10 }]}>Winner</Text>
          <Header navigation={navigation} title={win[0].title} />
          <View style={styles.starContainer}>
            <Text style={[fonts.h3]}>Overall: {2.24}</Text>
            <Stars
              default={Math.round(2.25 * 2) / 2}
              count={5}
              half={true}
              fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
              emptyStar={
                <Icon
                  name={"star-outline"}
                  style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                />
              }
              halfStar={
                <Icon name={"star-half"} style={[styles.myStarStyle]} />
              }
              disabled={true}
            />
          </View>

          <View style={styles.criteriaContainer}>
            <Text style={[fonts.h3, { fontSize: 12, color: "grey" }]}>
              Criteria Results
            </Text>
          </View>

          <Text style={[fonts.h2, { marginBottom: 10, color: "grey" }]}>
            Other Results
          </Text>
          {win.slice(1).map((option) => (
            <View>
              <Header
                navigation={navigation}
                title={option.title}
                backgroundColor={"#A9A9A9"}
                textColor={"white"}
              />
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  criteriaContainer: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    height: 100,
    marginVertical: 20,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  myStarStyle: {
    color: colors.primaryColor,
    fontSize: 25,
  },
  myEmptyStarStyle: {
    color: colors.primaryColor,
  },
});

export default Results;
