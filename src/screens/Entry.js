import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import Form from "../components/Form";
import exampleData from "../../exampleData.json";
import { fonts, colors } from "../styles/all_styles";
import { firebase } from "../../utils/firebase";
import Header from "../components/01_Atoms/Header";
import FormOption from "../components/FormOption";
import { Icon, Input } from "react-native-elements";
import Button from "../components/01_Atoms/Button";
// import Clipboard from '@react-native-community/clipboard';

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
  const [pollId, setPollId] = useState(null);
  const [userName, setUserName] = useState("");
  let roomCode;
  if (route) {
    roomCode = route.params.roomCode;
  }
  const [copiedCode, setCopiedCode] = useState(false);

  // for copying room code to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(roomCode);
    setCopiedCode(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const db = firebase
      .database()
      .ref("polls")
      .orderByChild("roomCode")
      .equalTo(roomCode);

    const handleData = (snap) => {
      if (snap.val()) {
        setData(Object.values(snap.val())[0]);
        setPollId(Object.keys(snap.val())[0]);
        setSectionData(fixSectionData(Object.values(snap.val())[0]));
      }
      setIsLoading(false);
    };

    db.on("value", handleData, (error) => console.log(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const currValues = { ...values };
    currValues["userName"] = userName;

    await firebase
      .database()
      .ref("polls/" + pollId + "/scores")
      .push(currValues)
      .catch((error) => {
        setSubmitError(error.message);
      });

    var count;
    const pollRef = firebase.database().ref("polls/" + pollId);

    pollRef
      .child("count")
      .once("value", (snap) => {
        count = snap.val();
      })
      .catch((error) => {
        setSubmitError(error.message);
      });

    count++;
    await pollRef.update({ count: count }).catch((error) => {
      setSubmitError(error.message);
    });

    navigation.navigate("Results", { pollId, roomCode, count });
  };

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
      optionsObj["userName"] = null;
      console.log(optionsObj);
      setValues(optionsObj);
    }
  }, [data]);

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: (values) => (
  //       <Button title="Submit" onPress={() => console.log(values)} />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={fonts.h1}>Room Code: {roomCode}</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Icon name="clipboard" type="material-community" />
          </TouchableOpacity>
        </View>

        <Text style={fonts.h1}>Prompt </Text>

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
          contentContainerStyle={{ width: "100%", paddingBottom: 25 }}
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
      {copiedCode ? (
        <Text style={{ textAlign: "center" }}>Room Code Copied!</Text>
      ) : null}
      <Input
        placeholder="Enter name"
        label="Your Name (Optional)"
        value={userName}
        onChangeText={(newText) => setUserName(newText)}
        containerStyle={styles.nameInput}
      />
      {!isLoading && <Button title="Submit" onPress={() => handleSubmit()} />}
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
  nameInput: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default Entry;
