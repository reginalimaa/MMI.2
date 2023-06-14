import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderContent from '../components/header';

const Manipulation = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(null);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const fetchData = () => {
    fetch(`http://192.168.0.105:3000/maquina/${searchText}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderContent />
        </View>
        
          <View style={styles.containerInput}>
            <TextInput
              placeholder="Pesquise a máquina pelo seu id"
              value={searchText}
              onChangeText={handleSearchTextChange}
              style={styles.input}
            />
            <TouchableOpacity onPress={fetchData} style={styles.button}>
              <Icon name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
          {data && (
            <View style={styles.card}>
              <Text>ID: {data._id}</Text>
              <Text>Nome: {data.nome}</Text>
              <Text>Capacidade: {data.capacidade}</Text>
              <Text>Data de Compra: {data.dataCompra}</Text>
              <Text>Tempo de Vida: {data.tempoVida}</Text>
              <Text>Descrição: {data.descricao}</Text>
              <Text>Fornecedor: {data.fornecedor}</Text>
              <Text>Marca: {data.marca}</Text>
              <Text>Localização: {data.localizacao}</Text>
            </View>
          )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 87,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 18,
    gap: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  
  
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
});

export default Manipulation;
