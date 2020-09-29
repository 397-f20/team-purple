import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList,
} from "react-native";
import Form from "../components/Form";
import exampleData from "../../exampleData.json";

const sectionData = exampleData.options.map((option) => ({
  title: option.title,
  info: option.info,
  data: ["scores"],
}));

const Entry = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: "100%" }}
        keyExtractor={(index) => `${index}`}
        renderItem={({ section: { data } }) => (
          <View style={styles.formContainer}>
            <Form
              initialValues={{
                id: null,
                meets: null,
                title: null,
              }}
            >
              {exampleData.criteria.map((item) => (
                <View key={item}>
                  <Text>{item}</Text>
                  <Form.Field name={item} placeholder={`Enter ${item}`} />
                </View>
              ))}
            </Form>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text>{title}</Text>
          </View>
        )}
      />
      <Text>PROMPT</Text>
      <Text>What Star Wars movie are we watching?</Text>
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
  },
  formContainer: {
    marginHorizontal: "10%",
  },
  header: {
    backgroundColor: "#81B2FD",
    padding: 10,
    marginBottom: 20,
  },
});

export default Entry;
