import React, { useState, useEffect } from 'react';
import { View, 
         StyleSheet, 
         Text, 
         TouchableOpacity, 
         TextInput,
         Alert,
         KeyboardAvoidingView
} from 'react-native';

import HeaderContent from '../components/header';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/text';
import Button from '../components/button';
import { ScrollView } from 'react-native-gesture-handler';

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
  const [enableshift, setenableShift] = useState(false);


  useEffect(() => {
    fetch(`http://192.168.0.106:3000/maquina/${machineId}`)
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
    fetch('http://192.168.0.106:3000/update', {
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
        Alert.alert(`editado com sucesso!`);
        navigation.navigate('Homee');
      })
      .catch((err) => {
        Alert.alert('Alguma coisa deu errado');
      });
  };

  const handleDeleteMachine = () => {
    fetch("http://192.168.0.106:3000/delete", {
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

      <View style={{ ...styles.formSection, paddingTop: 4 }}>
        {machineData && (
          <>
            <ScrollView>
            <CustomText text={'Altere ou delete dados'}/>
            <Text style={styles.inputStyle}>ID: {machineData._id}</Text>
            <KeyboardAvoidingView
            behavior="padding"
            style={styles.root}
            enabled={enableshift}
            >
              <TextInput
                style={styles.inputStyle}
                value={nome}
                onFocus={() => setenableShift(false)}
                keyboardType="ascii-capable"
                onChangeText={setNome}
                mode="outlined"
                placeholder="Nome"
              />
              <TextInput
                style={styles.inputStyle}
                value={capacidade}
                onFocus={() => setenableShift(false)}
                onChangeText={setCapacidade}
                placeholder="Capacidade"
              />
              <TextInput
                style={styles.inputStyle}
                value={dataCompra}
                onFocus={() => setenableShift(false)}
                onChangeText={setDataCompra}
                placeholder="Data de Compra"
              />
              <TextInput
                style={styles.inputStyle}
                value={tempoVida}
                onFocus={() => setenableShift(false)}
                onChangeText={setTempoVida}
                placeholder="Tempo de Vida"
              />
              <TextInput
                style={styles.inputStyle}
                value={descricao}
                onFocus={() => setenableShift(false)}
                onChangeText={setDescricao}
                placeholder="Descrição"
              />
              <TextInput
                style={styles.inputStyle}
                value={fornecedor}
                onFocus={() => setenableShift(false)}
                onChangeText={setFornecedor}
                placeholder="Fornecedor"
              />
              <TextInput
                style={styles.inputStyle}
                value={marca}
                onFocus={() => setenableShift(false)}
                onChangeText={setMarca}
                placeholder="Marca"
              />
              <TextInput
                style={styles.inputStyle}
                value={localizacao}
                onFocus={() => setenableShift(false)}
                onChangeText={setLocalizacao}
                placeholder="Localização"
              />
            </KeyboardAvoidingView>
            </ScrollView>
          </>
        )}
        <View styl e={styles.buttonContainer}>
        <Button 
          label='Deletar'
          onPress={() => { 
          handleDeleteMachine(); 
          navigation.navigate('Homee');}}>
        </Button>

        <Button
            label='Editar'
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
        </Button>
      </View>
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
    width: 120,
    height: 40,
    borderRadius: 5,
    marginHorizontal: 10
  },
  inputStyle: {
    margin: 5,
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 16,
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
  formSection:{
    paddingTop: 60,
    padding: 16,
    flex: 1,
  },
});

export default UpdateAndDelete;
