import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
} from "react-native";
import {fonts, colors} from '../../styles/all_styles';

const Header = ({ route, navigation, title }) => {

    return (
        <View style={styles.header}>
        <Text style={fonts.h2}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Description")}
        >
          {/* <Text style={[fonts.h2, { fontWeight: "normal" }]}>more</Text> */}
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    header: {
      backgroundColor: colors.primaryColor,
      padding: 10,
      marginBottom: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  
export default Header;