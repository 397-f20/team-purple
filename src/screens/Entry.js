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
  title: option,
  data: ["scores"],
}));

const Entry = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sectionData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(index) => `${index}`}
        renderItem={({ section: { data } }) => (
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 10,
  },
});

export default Entry;
