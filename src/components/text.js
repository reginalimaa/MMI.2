import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ text }) => {
  return (
    <Text style={styles.text}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 50,
  },
});

export default CustomText;
