import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomBtn = props => {
  return (
    <TouchableOpacity
      onPress={props.Press}
      style={{...props.BtnBody, ...styles.body}}>
      <Text style={{...styles.text, ...props.textStyle}}>{props.Text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
  },
});

export default CustomBtn;
