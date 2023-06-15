import React, { useState, useEffect } from 'react';
import { View, 
         StyleSheet, 
         Text, 
         TouchableOpacity, 
         TextInput,
         Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HeaderContent from '../components/header';
import { useNavigation } from '@react-navigation/native';

const UpdateAndDelete = ({ route }) => {
  const navigation = useNavigation();
  const { machineId } = route.params;

  const [machineData, setMachineData] = useState(null);
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [tempoVida, setTempoVida] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [marca, setMarca] = useState('');
  const [localizacao, setLocalizacao] = useState('');


  useEffect(() => {
    fetch(`http://192.168.0.100:3000/maquina/${machineId}`)
      .then((res) => res.json())
      .then((result) => {
        setMachineData(result);
        setNome(result.nome);
        setCapacidade(result.capacidade);
        setDataCompra(result.dataCompra);
        setTempoVida(result.tempoVida);
        setDescricao(result.descricao);
        setFornecedor(result.fornecedor);
        setMarca(result.marca);
        setLocalizacao(result.localizacao);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [machineId]);


  const handleEditMachine = (nome, capacidade, dataCompra, tempoVida, descricao, fornecedor, marca, localizacao) => {
    fetch('http://192.168.0.100:3000/update', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: machineData._id,
        nome,
        capacidade,
        dataCompra,
        tempoVida,
        descricao,
        fornecedor,
        marca,
        localizacao,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} foi editado com sucesso!`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Alguma coisa deu errado');
      });
  };

  const handleDeleteMachine = () => {
    fetch("http://192.168.0.100:3000/delete", {
      method: "delete",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: machineData._id
      })
    })
      .then(res => res.json())
      .then(() => {
        Alert.alert('Máquina deletada!');
      })
      .catch(err => {
        Alert.alert("Alguma coisa deu errado")
      })
  };

  if (!machineData) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderContent />
      </View>

      <View style={styles.card}>
        {machineData && (
          <>
            <Text>ID: {machineData._id}</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome"
            />
            <TextInput
              style={styles.input}
              value={capacidade}
              onChangeText={setCapacidade}
              placeholder="Capacidade"
            />
            <TextInput
              style={styles.input}
              value={dataCompra}
              onChangeText={setDataCompra}
              placeholder="Data de Compra"
            />
            <TextInput
              style={styles.input}
              value={tempoVida}
              onChangeText={setTempoVida}
              placeholder="Tempo de Vida"
            />
            <TextInput
              style={styles.input}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descrição"
            />
            <TextInput
              style={styles.input}
              value={fornecedor}
              onChangeText={setFornecedor}
              placeholder="Fornecedor"
            />
            <TextInput
              style={styles.input}
              value={marca}
              onChangeText={setMarca}
              placeholder="Marca"
            />
            <TextInput
              style={styles.input}
              value={localizacao}
              onChangeText={setLocalizacao}
              placeholder="Localização"
            />
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { 
          handleDeleteMachine(); 
          navigation.navigate('Homee');}}>
          <Text>Deletar</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleEditMachine(
                nome,
                capacidade,
                dataCompra,
                tempoVida,
                descricao,
                fornecedor,
                marca,
                localizacao
              )
            }
          >
          <Text>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default UpdateAndDelete;
