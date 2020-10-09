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
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import winner from "../../utils/winner";

const Results = ({ route, navigation }) => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [win, setWin] = useState(null);
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
    if (win == null && pollData != null) setWin(winner(pollData));
  }, [pollData]);

  // CHART DATA-------------------------------------------------
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => colors.primaryColor,
    strokeWidth: 2,
    barPercentage: 0.7,
    fillShadowGradient: colors.primaryColor,
    fillShadowGradientOpacity: 1,
  };


  
  return (
    <SafeAreaView style={styles.container}>
      {win == null ? (
        <ActivityIndicator />
      ) : (
          <View style={styles.contentContainer}>
            <Text style={[fonts.h2]}>Prompt</Text>
            <Text style={fonts.p}>{pollData.prompt}</Text>

            <Text style={[fonts.h2]}>Winner</Text>
            <Header navigation={navigation} title={win[0].title} />
            <BarChart
              style={{ marginLeft: -25 }}
              data={win[0].barData}
              width={300}
              height={220}
              chartConfig={chartConfig}
              withInnerLines={false}
              showValuesOnTopOfBars
              withHorizontalLabels={false}
            />

          <Text style={[fonts.h2]}>Other Results</Text>
            { 
              win.slice(1).map((option) => (
              <View>
                <Header navigation={navigation} title={option.title} />
                <BarChart
                  style={{ marginLeft: -25 }}
                  data={option.barData}
                  width={300}
                  height={220}
                  chartConfig={chartConfig}
                  withInnerLines={false}
                  showValuesOnTopOfBars
                  withHorizontalLabels={false}
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
  contentContainer: {
    padding: 20,
  },
});

export default Results;
