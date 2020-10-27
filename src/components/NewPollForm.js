import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, Button } from "react-native";
import Form from "../components/Form";

import { firebase } from "../../utils/firebase";

import randomWords from "random-words";

// FIXME: A text node cannot be a child of a <View>
const NewPollForm = ({ navigation, route }) => {
  const [submitError, setSubmitError] = useState("");
  const [prompt, setPrompt] = useState("Which movie are we watching?");
  const [options, setOptions] = useState(["movie 1", "movie 2"]);
  const [criteria, setCriteria] = useState(["writing", "vfx", "acting"]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const addCriteria = () => {
    setCriteria([...criteria, ""]);
  };

  const removeOption = () => {
    setOptions(options.slice(0, options.length - 1));
  };

  const removeCriteria = () => {
    setOptions(criteria.slice(0, criteria.length - 1));
  };

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
            prompt: prompt,
            options: options,
            criteria: criteria,
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
          {options.map((op, index) => (
            <Form.Field
              key={`options.${index}`}
              name={`options.${index}`}
              leftIcon="calendar-range"
              placeholder={op}
              autoCapitalize="none"
            />
          ))}
          {options.length < 5 && (
            <Button onPress={() => addOption()} title="Add option" />
          )}
          {options.length > 1 && (
            <Button onPress={() => removeOption()} title="Remove option" />
          )}
          <Text>Criteria</Text>
          {criteria.map((crit, index) => (
            <Form.Field
              key={`criteria.${index}`}
              name={`criteria.${index}`}
              leftIcon="calendar-range"
              placeholder={crit}
              autoCapitalize="none"
            />
          ))}
          {criteria.length < 5 && (
            <Button onPress={() => addCriteria()} title="Add criteria" />
          )}
          {criteria.length > 1 && (
            <Button onPress={() => removeCriteria()} title="Remove criteria" />
          )}
          <Form.Button title={"Create"} />
          {/* {<Form.ErrorMessage error={submitError} visible={true} />} */}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPollForm;