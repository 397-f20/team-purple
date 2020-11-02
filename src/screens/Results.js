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
  TouchableOpacity
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
  const [voteCount, setVoteCount] = useState(route.params.count); // how many votes are in
  var roomCode = route.params.roomCode;
  let pollId;

  if (!route.params) {
    pollId = "-MKq65RirJuEavylaDax";
  } else {
    pollId = route.params.pollId;
  }

  // change back button to a home button
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
        onPress={()=>navigation.navigate("Home")}
        style={{marginLeft: '10px'}}
        >
          <Icon name="home" size={25}/>
        </TouchableOpacity>

      ),
    });
  }, [navigation]);

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

  // win = [{
  //   title: option,
  //   overall: scaledOverallRating,
  //   labels: [...criteria],
  //   criteriaRatings: scaledCriteriaRating,
  // }, {

  // }]

  return (
    <SafeAreaView style={styles.container}>
      {win == null ? (
        <ActivityIndicator />
      ) : (
          <View style={styles.contentContainer}>
            <View style={styles.voteCountContainer}>
              <Text style={fonts.p}> Vote Count: </Text>
              <Text style={[fonts.p, styles.voteCount]}> {voteCount} </Text>
            </View>
            <View style={styles.promptContainer}>
              <Text style={[fonts.h2]}>Prompt</Text>
              <Text style={fonts.p}>{pollData.prompt}</Text>
            </View>

            <Text style={[fonts.h2, { marginBottom: 10 }]}>Winner</Text>
            <Header navigation={navigation} title={win[0].title} />
            <View style={styles.starContainer}>
              <Text style={[fonts.h3]}>Overall: {win[0].overall}</Text>
              <Stars
                default={Math.round(win[0].overall * 2) / 2}
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
              <FlatList
                data={win[0].criteriaRatings}
                keyExtractor={(item) => `${item}`}
                contentContainerStyle={{ paddingBottom: 50 }}
                renderItem={({ item, index }) => (
                  <View style={styles.criteriaRatings}>
                    <Text>{win[0].labels[index]}</Text>
                    <Stars
                      default={Math.round(win[0].criteriaRatings[index] * 2) / 2}
                      count={5}
                      half={true}
                      fullStar={
                        <Icon
                          name={"star"}
                          style={[styles.myStarStyle, { fontSize: 18 }]}
                        />
                      }
                      emptyStar={
                        <Icon
                          name={"star-outline"}
                          style={[
                            styles.myStarStyle,
                            styles.myEmptyStarStyle,
                            { fontSize: 18 },
                          ]}
                        />
                      }
                      halfStar={
                        <Icon
                          name={"star-half"}
                          style={[styles.myStarStyle, { fontSize: 18 }]}
                        />
                      }
                      disabled={true}
                    />
                  </View>
                )}
              />
            </View>

            <View style={styles.divider} />


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

                <View style={styles.starContainer}>
                  <Text style={[fonts.h3, { color: 'grey' }]}>Overall: {option.overall}</Text>
                  <Stars
                    default={Math.round(option.overall * 2) / 2}
                    count={5}
                    half={true}
                    fullStar={<Icon name={"star"} style={[styles.myStarStyle, { color: 'grey' }]} />}
                    emptyStar={
                      <Icon
                        name={"star-outline"}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle, { color: 'grey' }]}
                      />
                    }
                    halfStar={
                      <Icon name={"star-half"} style={[styles.myStarStyle, { color: 'grey' }]} />
                    }
                    disabled={true}
                  />
                </View>
                <View style={styles.criteriaContainer}>
                  <Text style={[fonts.h3, { fontSize: 12, color: "grey" }]}>
                    Criteria Results
            </Text>
                  <FlatList
                    data={option.criteriaRatings}
                    keyExtractor={(item) => `${item}`}
                    contentContainerStyle={{ paddingBottom: 50 }}
                    renderItem={({ item, index }) => (
                      <View style={styles.criteriaRatings}>
                        <Text>{option.labels[index]}</Text>
                        <Stars
                          default={Math.round(option.criteriaRatings[index] * 2) / 2}
                          count={5}
                          half={true}
                          fullStar={
                            <Icon
                              name={"star"}
                              style={[styles.myStarStyle, { fontSize: 18, color: "grey" }]}
                            />
                          }
                          emptyStar={
                            <Icon
                              name={"star-outline"}
                              style={[
                                styles.myStarStyle,
                                styles.myEmptyStarStyle,
                                { fontSize: 18, color: "grey" },
                              ]}
                            />
                          }
                          halfStar={
                            <Icon
                              name={"star-half"}
                              style={[styles.myStarStyle, { fontSize: 18, color: "grey" }]}
                            />
                          }
                          disabled={true}
                        />
                      </View>
                    )}
                  />
                </View>
              </View>
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
    alignSelf: "center"
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
  criteriaContainer: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    height: 100,
    marginVertical: 20,
  },
  criteriaRatings: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
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
  roomCode: {
    ...buttonBase,
    backgroundColor: "#bababa",
    color: "white",
  },
  voteCountContainer: {
    width: '100%',
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'flex-end',

  },
  voteCount: {
    color: colors.primaryColor,
    fontWeight: 'bold'
  }
});

export default Results;
