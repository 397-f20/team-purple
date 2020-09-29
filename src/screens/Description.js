import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";

const Description = ({ route }) => {
  const option = {
    name: "Empire Strikes Back",
    description: `After destroying the Death Star, the Rebel Alliance is forced to hole up on the freezing planet of Hoth while the Empire desperately tries to locate their secret base. In fact, the movie starts off with an Imperial probe crash-landing onto Hoth's surface.`,
    link: "http://google.com",
  };
  //use state?
  var link = "";
  if (option.link) {
    link = (
      <View style={styles.descriptionSection}>
        <Text style={styles.heading}>Link</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => Linking.openURL(option.link)}
        >
          <Text style={styles.linkText}> {option.name} </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.descriptionSection}>
          <Text style={styles.heading}>Description</Text>
          <Text>{option.description}</Text>
        </View>
        {link}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      //this creates issues on mobile
    //flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  descriptionSection: {
    marginBottom: 10,
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  link: {
    flex: 1,
    backgroundColor: "blue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    padding: 10,
    // how to make width responsive/fit-content???
  },
  linkText: {
    color: "white",
  },
});

export default Description;
