import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Image,
} from "react-native";
import { fonts } from "../styles/all_styles";
import RoomCodeEntry from "../components/01_Atoms/RoomCodeEntry";

const Home = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          data-cy="/newPollButton"
          title="New Poll"
          onPress={() => navigation.navigate("NewPoll")}
        />
      ),
    });
  }, [navigation]);

  const [roomCode, setRoomCode] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.instructions}>
        <Text style={[fonts.p, { fontWeight: 'bold' }]}>Instructions:</Text>
        <Text style={[fonts.p]}>
          Enter the room code below or start a new poll!
      </Text>
      </View>


      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      {/* entry for room code */}
      <RoomCodeEntry
        roomCode={roomCode}
        setRoomCode={setRoomCode}
        navigation={navigation}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
  },
  instructions: {
    marginTop: '10px',
    marginBottom: '200px'
  },
  input: {
    height: 40,
    width: "80%",
    backgroundColor: "white",
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
    marginBottom: "10%",
  },
});

export default Home;
