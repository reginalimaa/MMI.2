import React from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ searchText, onSearchTextChange, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquise a máquina pelo seu id"
        value={searchText}
        onChangeText={onSearchTextChange}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSearch} style={styles.button}>
        <Icon name="search" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
});
