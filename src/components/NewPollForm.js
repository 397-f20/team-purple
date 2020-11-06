import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, Button } from "react-native";
import Form from "../components/Form";
import * as Yup from "yup";

import { firebase } from "../../utils/firebase";
import validatePollForm from "../../utils/pollValidation";

import randomWords from "random-words";

const validationSchema = Yup.object().shape({
  // id: Yup.string()
  //   .required()
  //   .matches(/(F|W|S)\d{3,}/, "Must be a term and 3-digit number")
  //   .label("ID"),
  // meets: Yup.string()
  //   .required()
  //   .matches(
  //     /(M|Tu|W|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/,
  //     "Must be weekdays followed by start and end time"
  //   )
  //   .label("Meeting times"),
  prompt: Yup.string().required().label("Prompt"),
  // options: Yup.mixed().notOneOf(["op1"]).defined(),
  // criteria: ,
});

const placeholders = {
  options: ["movie 1", "movie 2"],
  criteria: ["vfx", "act", "sound"],
};

// FIXME: A text node cannot be a child of a <View>
const NewPollForm = ({ navigation, route }) => {
  const [submitError, setSubmitError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [criteria, setCriteria] = useState(["", "", ""]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMesssage] = useState("");

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
    setCriteria(criteria.slice(0, criteria.length - 1));
  };

  async function handleSubmit(values) {
    console.log(values);
    const { prompt, options, criteria } = values;

    let valid = validatePollForm(options, criteria);
    console.log(valid);
    setErrorMesssage(valid);

    const hasRepeats = (array) => {
      let seen = {};
      for (let item of array) {
        if (!seen[item]) seen[item] = true;
        else return true;
      }
    };

    // if (hasRepeats(options)) {
    //   setErrorMesssage("No repeated options!");
    //   setHasError(true);
    //   return;
    // }

    // if (hasRepeats(criteria)) {
    //   setErrorMesssage("No repeated criteria!");
    //   setHasError(true);
    //   return;
    // }

    if (valid != "") return;

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
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Text>Prompt</Text>
          <Form.Field
            name="prompt"
            leftIcon=""
            placeholder="What movie are we watching?"
            autoCapitalize="none"
            autoFocus={true}
          />
          <Text>Options</Text>
          {options.map((op, index) => (
            <Form.Field
              key={`options[${index}]`}
              name={`options[${index}]`}
              leftIcon="calendar-range"
              placeholder={
                index < placeholders.options.length
                  ? placeholders.options[index]
                  : `option #${index + 1}`
              }
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
              key={`criteria[${index}]`}
              name={`criteria[${index}]`}
              leftIcon="calendar-range"
              placeholder={
                index < placeholders.criteria.length
                  ? placeholders.criteria[index]
                  : `criteria #${index + 1}`
              }
              autoCapitalize="none"
            />
          ))}
          {criteria.length < 5 && (
            <Button onPress={() => addCriteria()} title="Add criteria" />
          )}
          {criteria.length > 1 && (
            <Button onPress={() => removeCriteria()} title="Remove criteria" />
          )}
          {
            <Form.ErrorMessage
              error={errorMessage}
              visible={errorMessage != ""}
            />
          }
          <Form.Button title={"Create"} />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewPollForm;
