import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";

// data for the flatlist
const DATA = [
  {
    title: 'Movie',
    prompt: 'What movie should we watch?',
    criteria: ['VFX', 'Soundtrack', 'Writing', 'Acting']
  },
  {
    title: 'Restaurant',
    prompt: 'What restaurant should we eat at?',
    criteria: ['Cost', 'Vibe', 'Food Quality', 'Distance']
  },
  {
    title: 'Tech Stack',
    prompt: 'What should we use for our frontend or backend tech stack?',
    criteria: ['Documentation', 'Prior Knowledge', 'Feasability']
  },
  {
    title: 'Contact Platform',
    prompt: 'How will our team communicate for this project?',
    criteria: ['Prior Experience', 'Check Frequency', 'Feasability']
  }
]

const BundledOptions = ({onPress}) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={DATA} 
        keyExtractor={(item) => item.title} 
        horizontal
        contentContainerStyle={{paddingLeft: '10px'}}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => 
          <TouchableOpacity style={styles.card} onPress={()=> onPress(item)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    justifyContent: 'center'
  },
  card: {
    backgroundColor: colors.secondaryColor,
    width: '100px',
    height: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    marginRight: '10px',
    padding: '5px',
  },
  cardTitle: {
    textAlign: 'center',
    color: 'white'
  }
});

export default BundledOptions;
