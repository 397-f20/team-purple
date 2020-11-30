import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import { fonts, colors } from "../styles/all_styles";
import RoomCodeEntry from "../components/01_Atoms/RoomCodeEntry";

const Home = ({ route, navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button
            data-cy="/newPollButton"
            title="New Poll"
            color={colors.primaryColor}
            onPress={() => navigation.navigate("NewPoll")}
          />
        </View>
      ),
    });
  }, [navigation]);

  const [roomCode, setRoomCode] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.instructions}>
        <Text
          style={[
            fonts.p,
            { fontWeight: "bold", marginBottom: 15, fontSize: 20 },
          ]}
        >
          Welcome!
        </Text>
        <Text style={[fonts.p, { fontSize: 13 }]}>
          Use Tiebreaker to ensure all members in the group have their voice
          heard when making decisions. If the prompt has already been created,
          enter the poll code below. If not, create a new poll by tapping the
          button in the top right.
        </Text>
      </View>

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
    marginTop: 50,
  },
  instructions: {
    marginTop: "10px",
    marginBottom: "50px",
    marginHorizontal: "5%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
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
