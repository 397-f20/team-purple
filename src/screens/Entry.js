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
import { firebase } from "../../firebase";
import Header from '../components/01_Atoms/Header';

const fixSectionData = (json) =>
  json.options.map((option) => ({
    title: option.title,
    info: option.info,
    data: ["scores"],
  }));

const Entry = ({ route, navigation }) => {
  const [sectionData, setSectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const db = firebase.database().ref();
    db.on(
      "value",
      (snap) => {
        if (snap.val()) {
          setSectionData(fixSectionData(snap.val()));
          setCriteria(snap.val().criteria);
        }
        setIsLoading(false);
      },
      (error) => console.log(error)
    );
  }, []);

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
          What Star Wars movie are we watching?
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={sectionData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "100%" }}
          keyExtractor={(index) => `${index}`}
          renderItem={({ section: { data } }) => (
            <View style={styles.formContainer}>
              <Form
                initialValues={{
                  id: "",
                  userId: "",
                }}
              >
                {criteria.map((item) => (
                  <View key={item} style={styles.field}>
                    <Text style={fonts.p}>{item}</Text>
                    <View style={styles.field__input}>
                      <Form.Field name={`${item}`} placeholder={`${item}`} />
                    </View>
                  </View>
                ))}
              </Form>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Header navigation={navigation} title={title}/>
          )}
        />
      )}
    </SafeAreaView>
  );
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
