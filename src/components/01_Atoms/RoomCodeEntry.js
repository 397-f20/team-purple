import React from "react";
import { StyleSheet, SafeAreaView, Text, Button, TextInput, View } from "react-native";
import { fonts } from '../../styles/all_styles';

const RoomCodeEntry = ({ roomCode, setRoomCode, navigation }) => {

    return (
        <View style={styles.RoomCodeEntry}>
            {/* entry for room code */}
            <Text style={[fonts.h1, { marginBottom: 15 }]}>Room Code:</Text>
            <TextInput
                style={styles.input}
                onSubmitEditing={() => navigation.navigate("Entry", {roomCode })}
                onChangeText={(text) => setRoomCode(text)}
                value={roomCode}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    RoomCodeEntry:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        width: '80%',
        backgroundColor: 'white'
    },
});

export default RoomCodeEntry;
