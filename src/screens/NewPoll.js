import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList,
  Button,
  TextInput,
} from "react-native";
import Form from "../components/Form";

import { firebase } from "../../utils/firebase";

import randomWords from "random-words";

// TODO: Use state to update form entries
// FIXME: A text node cannot be a child of a <View>
const NewPoll = ({ navigation, route }) => {
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(values) {
    const { prompt, options, criteria } = values;
    const roomCode = randomWords();
    console.log(roomCode);
    const newPoll = { prompt, options, criteria, roomCode, count: 0 };
    await firebase
      .database()
      .ref("polls")
      .push(newPoll)
      .catch((error) => {
        setSubmitError(error.message);
      });
    navigation.navigate("Entry", { roomCode });
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Form
          initialValues={{
            prompt: "Which movie are we watching?",
            options: ["movie 1", "movie 2"],
            criteria: ["writing", "vfx", "acting"],
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Text>Prompt</Text>
          <Form.Field
            name="prompt"
            leftIcon=""
            placeholder="Prompt"
            autoCapitalize="none"
            autoFocus={true}
          />
          <Text>Options</Text>
          {["movie 1", "movie 2"].map((op, index) => (
            <Form.Field
              name={`options.${index}`}
              leftIcon="calendar-range"
              placeholder={op}
              autoCapitalize="none"
            />
          ))}
          <Text>Criteria</Text>
          {["writing", "vfx", "acting"].map((crit, index) => (
            <Form.Field
              name={`criteria.${index}`}
              leftIcon="calendar-range"
              placeholder={crit}
              autoCapitalize="none"
            />
          ))}
          <Form.Button title={"Create"} />
          {/* {<Form.ErrorMessage error={submitError} visible={true} />} */}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPoll;
