import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { fonts, colors } from "../styles/all_styles";
import { firebase } from "../../utils/firebase";
import ResultGraph from "../components/02_Molecules/ResultGraph";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import decision from "../../utils/decision";

const Results = ({ route, navigation }) => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [winner, setWinner] = useState(null);
  const pollId = route.params.pollId;

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
    if (winner == null && pollData != null) setWinner(decision(pollData));
  }, [pollData]);

  return (
    <SafeAreaView style={styles.container}>
      {winner == null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.contentContainer}>

          {/* Let me know if you think this should go in a ResultHeader component  */}
          <Text style={[fonts.h2]}>Prompt</Text>
          <Text style={fonts.p}>{pollData.prompt}</Text>

          <Text style={[fonts.h2]}>Winner</Text>
          <ResultGraph title={winner[0].title} data={winner[0].barData} />

          <Text style={[fonts.h2]}>Other Results</Text>
          {winner.slice(1).map((option) => (
            <ResultGraph title={option.title} data={option.barData} />
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
  contentContainer: {
    padding: 20,
  },
});

export default Results;
