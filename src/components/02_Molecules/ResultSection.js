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
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";
import { firebase } from "../../../utils/firebase";
import Header from "../01_Atoms/Header";
import winner from "../../../utils/winner";
import Stars from "react-native-stars";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

const ResultSection = ({ data, headerColor, headerTextColor, other }) => {
  return (
    <View>
      <Header title={data.title} backgroundColor={headerColor} textColor={headerTextColor} />
      <View style={styles.starContainer}>
        <Text
          style={[fonts.h3, { color: other ? "grey" : colors.primaryColor }]}
        >
          Overall: {data.overall.toFixed(2)}
        </Text>
        <Stars
          default={Math.round(data.overall * 2) / 2}
          count={5}
          half={true}
          fullStar={
            <MaterialCommunityIcons
              name={"star"}
              style={[
                styles.myStarStyle,
                { color: other ? "grey" : colors.primaryColor },
              ]}
            />
          }
          emptyStar={
            <MaterialCommunityIcons
              name={"star-outline"}
              style={[
                styles.myStarStyle,
                styles.myEmptyStarStyle,
                { color: other ? "grey" : colors.primaryColor },
              ]}
            />
          }
          halfStar={
            <MaterialCommunityIcons
              name={"star-half"}
              style={[
                styles.myStarStyle,
                { color: other ? "grey" : colors.primaryColor },
              ]}
            />
          }
          disabled={true}
        />
      </View>

      <View style={styles.criteriaContainer}>
        <Text style={[fonts.h3, { fontSize: 12, color: "grey" }]}>
          Criteria Results
        </Text>
        <FlatList
          data={data.criteriaRatings}
          keyExtractor={(item) => `${item}`}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item, index }) => (
            <View style={styles.criteriaRatings}>
              <Text>{data.labels[index]}</Text>
              <Stars
                default={Math.round(data.criteriaRatings[index] * 2) / 2}
                count={5}
                half={true}
                fullStar={
                  <MaterialCommunityIcons
                    name={"star"}
                    style={[
                      styles.myStarStyle,
                      { fontSize: 18 },
                      { color: other ? "grey" : colors.primaryColor },
                    ]}
                  />
                }
                emptyStar={
                  <MaterialCommunityIcons
                    name={"star-outline"}
                    style={[
                      styles.myStarStyle,
                      styles.myEmptyStarStyle,
                      { fontSize: 18 },
                      { color: other ? "grey" : colors.primaryColor },
                    ]}
                  />
                }
                halfStar={
                  <MaterialCommunityIcons
                    name={"star-half"}
                    style={[
                      styles.myStarStyle,
                      { fontSize: 18 },
                      { color: other ? "grey" : colors.primaryColor },
                    ]}
                  />
                }
                disabled={true}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
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
});

export default ResultSection;
