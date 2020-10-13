import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  SectionList, Button, TextInput, Image
} from "react-native";
import { fonts } from '../styles/all_styles';


const Home = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="New Poll"
          onPress={() => navigation.navigate("NewPoll")}
        />
      ),
    });
  }, [navigation]);

  const [roomCode, setRoomCode] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
            <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />

      <Text style={[fonts.h1, { marginBottom: 15 }]}>Room Code:</Text>
      <TextInput
        style={styles.input}
        onSubmitEditing={() => navigation.navigate("Entry", { roomCode })}
        onChangeText={(text) => setRoomCode(text)}
        value={roomCode}
      />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    height: 40,
    width: '80%',
    backgroundColor: 'white'
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
  logo: {
    width: 300,
    height: 52,
    marginBottom: '10%'
  }
});

export default Home;
