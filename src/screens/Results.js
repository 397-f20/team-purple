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
import { firebase } from "../../firebase";

const Results = ({ route, navigation }) => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const db = firebase.database().ref();
      await db.on(
        "value",
        (snap) => {
          if (snap.val()) setPollData(snap.val());
          setIsLoading(false);
        },
        (error) => console.log(error)
      );
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {pollData == null ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={[fonts.h2]}>Prompt</Text>
          <Text style={fonts.p}>{pollData.prompt}</Text>
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
