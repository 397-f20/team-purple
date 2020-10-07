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
import exampleData from "../../exampleData.json";
import { fonts, colors } from "../styles/all_styles";
import { firebase } from "../../utils/firebase";
import Header from "../components/01_Atoms/Header";
import FormOption from "../components/FormOption";

const fixSectionData = (json) =>
  json.options.map((option) => ({
    title: option,
    data: ["scores"],
  }));

const Entry = ({ route, navigation }) => {
  const [sectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);

  const roomCode = route.params.roomCode;

  useEffect(() => {
    setIsLoading(true);
    const db = firebase.database().ref('polls').orderByChild('roomCode').equalTo(roomCode);

    db.on(
      "value",
      (snap) => {
        if (snap.val()) {
          setData(Object.values(snap.val())[0]);
          setSectionData(fixSectionData(Object.values(snap.val())[0]));
        }
        setIsLoading(false);
      },
      (error) => console.log(error)
    );
  }, []);

  useEffect(() => {
    if (data != null && values == null) {
      const mappedCriteria = data.criteria.map(function (key) {
        return [key, 0];
      });
      const valuesObj = Object.fromEntries(mappedCriteria);
      const mappedOptions = data.options.map(function (key) {
        return [key, { ...valuesObj }];
      });
      const optionsObj = Object.fromEntries(mappedOptions);
      console.log(optionsObj);
      setValues(optionsObj);
    }
  }, [data]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Submit"
          onPress={() => navigation.navigate("Confirmation")}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={fonts.h1}>Prompt</Text>
        <Text style={[fonts.h1, { fontWeight: "normal" }]}>
          {data != null ? data.prompt : "isLoading..."}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={sectionData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%", paddingBottom: 200 }}
          keyExtractor={(index) => `${index}`}
          renderItem={({ section: { title } }) => (
            <FormOption
              criteria={data.criteria}
              values={values}
              setValues={setValues}
              option={title}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Header navigation={navigation} title={title} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  field: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  field__input: {
    width: "30%",
  },
  formContainer: {
    marginHorizontal: "10%",
  },
  header: {
    backgroundColor: colors.primaryColor,
    padding: 10,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Entry;
