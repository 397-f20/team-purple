import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import Form from "../components/Form";
import * as Yup from "yup";
import Button from "../components/01_Atoms/Button";
import { fonts } from "../styles/all_styles";
import BundledOptions from "./03_Organisms/BundledOptions";
import { firebase } from "../../utils/firebase";
import validatePollForm from "../../utils/pollValidation";
import FormField from "./01_Atoms/FormField";

import randomWords from "random-words";

const validationSchema = Yup.object().shape({
  prompt: Yup.string().required().label("Prompt"),
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

    const pollEval = validatePollForm(options, criteria);
    let valid = pollEval.message;
    const cleanedOptions = pollEval.options;
    const cleanedCriteria = pollEval.criteria;

    console.log(valid);
    setErrorMesssage(valid);

    if (valid != "") return;

    const roomCode = randomWords();
    console.log(roomCode);
    const newPoll = {
      prompt,
      options: cleanedOptions,
      criteria: cleanedCriteria,
      roomCode,
      count: 0,
    };

    await firebase
      .database()
      .ref("polls")
      .push(newPoll)
      .catch((error) => {
        setSubmitError(error.message);
      });
    navigation.navigate("Entry", { roomCode });
  }

  const setBundled = (bundled) => {
    console.log(bundled)
    setPrompt(bundled.prompt)
    setCriteria(bundled.criteria)
  }

  const updateOptions = (index, elem) => {
    let temp = options
    temp[index] = elem 
    setOptions(temp)
  }

  const updateCriteria = (index, elem) => {
    let temp = criteria
    temp[index] = elem 
    setCriteria(temp)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <BundledOptions onPress={setBundled}/>
        <Form
          initialValues={{
            prompt: prompt,
            options: options,
            criteria: criteria,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Text style={[fonts.h3, { marginLeft: "10px" }]}>Prompt</Text>
          <Form.Field
            name="prompt"
            leftIcon=""
            placeholder="What movie are we watching?"
            autoCapitalize="none"
            autoFocus={true}

          />
          <Text style={[fonts.h3, { marginLeft: "10px" }]}>Options</Text>
          {options.map((op, index) => (

            <FormField
              key={`options[${index}]`}
              value={op}
              leftIcon="format-list-bulleted-square"
              placeholder={
                index < placeholders.options.length
                  ? placeholders.options[index]
                  : `option #${index + 1}`
              }
              onChangeText={() => updateOptions(index, op)}
              autoCapitalize="none"
            />
          ))}
          <View style={styles.ButtonContainer}>
            {options.length < 5 && (
              <Button
                type="secondary"
                width="45%"
                onPress={() => addOption()}
                title="Add option"
              />
            )}
            {options.length > 1 && (
              <Button
                type="secondary"
                width="45%"
                onPress={() => removeOption()}
                title="Remove option"
              />
            )}
          </View>

          <Text style={[fonts.h3, { marginLeft: "10px" }]}>Criteria</Text>
          {criteria.map((crit, index) => (
            <Form.Field
              key={`criteria[${index}]`}
              name={`criteria[${index}]`}
              leftIcon="bullseye-arrow"
              placeholder={
                index < placeholders.criteria.length
                  ? placeholders.criteria[index]
                  : `criteria #${index + 1}`
              }
              autoCapitalize="none"
            />
          ))}
          <View style={styles.ButtonContainer}>
            {criteria.length < 5 && (
              <Button
                type="secondary"
                width="45%"
                onPress={() => addCriteria()}
                title="Add criteria"
              />
            )}
            {criteria.length > 1 && (
              <Button
                type="secondary"
                width="45%"
                onPress={() => removeCriteria()}
                title="Remove criteria"
              />
            )}
          </View>
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

const styles = StyleSheet.create({
  ButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: "20px",
  },
});
export default NewPollForm;
