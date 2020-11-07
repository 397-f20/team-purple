import React, { useRef, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import { fonts, colors } from "../../styles/all_styles";
import { Icon } from "react-native-elements";

const Button = ({title, type, width, onPress }) => {
    return (
      <TouchableOpacity style={[styles.Button, width ? {width: width} : null, type=="secondary"?{backgroundColor: 'darkgray'}:null]} onPress={()=>onPress()}>
          <Text style={styles.ButtonTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    Button:{
        backgroundColor: colors.secondaryColor,
        // width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '10px'
    },
    ButtonTitle: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '16px'
    }
  });
  
  export default Button;
  