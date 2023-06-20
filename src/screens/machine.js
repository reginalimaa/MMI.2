import React, { useState } from 'react';
import { View,  
         StyleSheet, 
         StatusBar, 
         ScrollView, 
         KeyboardAvoidingView 
} from 'react-native';

import { TextInput } from 'react-native-paper';

import HeaderContent from '../components/header';
import CustomText from '../components/text';
import Button from '../components/button';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const CreateMachine = () => {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [dataCompra, setDataCompra] = useState('');
    const [tempoVida, setTempoVida] = useState('');
    const [descricao, setDescricao] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [marca, setMarca] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [enableshift, setenableShift] = useState(false);

    const handleCadastrar = () => {
        if (
          nome === '' || 
          capacidade === '' ||
          dataCompra === '' ||
          tempoVida === '' ||
          descricao === '' ||
          fornecedor === '' ||
          marca === '' ||
          localizacao === ''
        ) {
          Alert.alert('Todos os campos devem ser preenchidos');
        } else {
          submitData();
          navigation.navigate('Homee');
        }
      };
    
    const submitData = () => {
        fetch('http://192.168.0.106:3000/send-data', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
            Alert.alert(`Máquina cadastrada com sucesso!`);
            navigation.navigate('Homee');
          })
          .catch((err) => {
            Alert.alert('alguma coisa deu errado' + err);
          });
      };

    return (
        <> 
            <StatusBar />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <HeaderContent />
                    </View>     
                    <View style={styles.formSection}>
                        <CustomText text="Preencha os campos abaixo"/>
                        <ScrollView>
                            <KeyboardAvoidingView
                            behavior="position"
                            style={styles.root}
                            enabled={enableshift}
                            >
                                <TextInput
                                    label="Nome"
                                    style={[styles.inputStyle]}
                                    value={nome}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setNome(text)}
                                />
                                <TextInput
                                    label="Capacidade"
                                    style={styles.inputStyle}
                                    value={capacidade}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setCapacidade(text)}
                                />
                                <TextInput
                                    label="Data de compra"
                                    style={styles.inputStyle}
                                    value={dataCompra}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="numeric"
                                    mode="outlined"
                                    onChangeText={(text) => setDataCompra(text)}
                                />
                                <TextInput
                                    label="Tempo de vida estimado pelos fabricantes"
                                    style={styles.inputStyle}
                                    value={tempoVida}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setTempoVida(text)}
                                />
                                <TextInput
                                    label="Descrição"
                                    style={styles.inputStyle}
                                    value={descricao}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setDescricao(text)}
                                />
                                <TextInput
                                    label="Fornecedor"
                                    style={styles.inputStyle}
                                    value={fornecedor}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setFornecedor(text)}
                                />
                                <TextInput
                                    label="Marca"
                                    style={styles.inputStyle}
                                    value={marca}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setMarca(text)}
                                />
                                 <TextInput
                                    label="Localização"
                                    style={styles.inputStyle}
                                    value={localizacao}
                                    theme={theme}
                                    onFocus={() => setenableShift(false)}
                                    keyboardType="ascii-capable"
                                    mode="outlined"
                                    onChangeText={(text) => setLocalizacao(text)}
                                />
                            </KeyboardAvoidingView>
                            <Button 
                              label='Cadastrar' 
                              onPress={() => { handleCadastrar(); navigation.navigate('Homee');}} 
                            />
                        </ScrollView>
                    </View>
                </View>
            </>
    )
}

const theme = {
    colors: {
      primary: '#006aff',
    },
}
const styles = StyleSheet.create({
    formSection:{
        padding: 16,
        flex: 1,
    },
    header: {
        width: "100%",
        height: 87,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#000",
        paddingHorizontal: 18,
        gap: 8
      },
    container: {
        flex: 1,
        justifyContent: 'center',
         
        backgroundColor: '#D3D3D3'
    },   
    inputStyle: {
        margin: 5,
        backgroundColor: 'white',
        color: 'black'
    },
    
}); 

export default CreateMachine;