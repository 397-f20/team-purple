import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home";
import Entry from "./src/screens/Entry";
import Confirmation from "./src/screens/Confirmation";
import Description from "./src/screens/Description";
import Results from "./src/screens/Results";
import NewPoll from "./src/screens/NewPoll"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
            name="NewPoll"
            component={NewPoll}
            options={{ title: "New Poll" }}
          />
        <Stack.Screen name="Entry" component={Entry} />
        {/* change name to option.name or state */}
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
