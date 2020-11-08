import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Form from "../components/Form";
import { fonts, colors } from "../styles/all_styles";
import Stars from "react-native-stars";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const FormOption = ({ criteria, values, setValues, option }) => {
  const setNewVal = (key, val) => {
    const currValues = { ...values };
    currValues[option][key] = val;
    setValues(currValues);
  };

  if (values != null) {
    return (
      <View style={styles.formContainer}>
        {criteria.map((item) => (
          <View key={item} style={styles.field}>
            <Text style={fonts.p}>{item}</Text>
            <View style={styles.labelContainer}>
              {/* <View style={styles.numContainer}>
                <Text style={styles.val}>{values[option][item]}</Text>
              </View> */}
              <View style={styles.field__input}>
                <Stars
                  default={values[option][item]}
                  count={5}
                  half={false}
                  update={(value) => setNewVal(item, value)}
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
                />
              </View>
              <View style={styles.numContainer}>
                <Text style={styles.val}>{values[option][item]}</Text>
              </View> 
            </View>
          </View>
        ))}
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  field: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  field__input: {
    width: "100%",
    marginVertical: 10,
    width: "60%",
  },
  formContainer: {
    marginHorizontal: "10%",
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  val: {
    fontWeight: "bold",
    color: "white",
  },
  numContainer: {
    backgroundColor: colors.primaryColor,
    width: 30,
    height: 30,
    borderRadius: 5,
    marginLeft: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  myStarStyle: {
    color: colors.primaryColor,
    fontSize: 25,
  },
  myEmptyStarStyle: {
    color: colors.primaryColor,
  },
});

export default FormOption;
