import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderContent from '../components/header';

const Teste = () => {
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

    const editData = () => {
      fetch('http://192.168.0.105:3000/update', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
          nome: data.nome,
          capacidade: data.capacidade,
          dataCompra: data.dataCompra,
          tempoVida: data.tempoVida,
          descricao: data.descricao,
          fornecedor: data.fornecedor,
          marca: data.marca,
          localizacao: data.localizacao,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert(`${data.name} foi editado com sucesso!`);
          // navigation.navigate('Home'); // Certifique-se de importar 'navigation' do React Navigation
        })
        .catch((err) => {
          Alert.alert('Alguma coisa deu errado');
        });
    };
    
    const deleteData = () => {
      fetch('http://192.168.1.9:3000/delete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
        }),
      })
        .then((res) => res.json())
        .then((deletedEmp) => {
          Alert.alert(`${deletedEmp.name} foi deletado!`);
          // navigation.navigate('Home'); // Certifique-se de importar 'navigation' do React Navigation
        })
        .catch((err) => {
          Alert.alert('Alguma coisa deu errado');
        });
    };
    

    return (
        <>
            <HeaderContent />
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
        </>
    )
}

const styles = StyleSheet.create({
  containerInput: {
    flexDirection: 'row'
  },
  input:{
    borderWidth: 1,
    height: 40,
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
  card: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },

});

export default Teste;