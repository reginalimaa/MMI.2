import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import Button from '../components/button';
import CustomText from '../components/text';
import HeaderContent from '../components/header';

import { createStackNavigator } from '@react-navigation/stack';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', email);
        console.log('Senha:', password);
    }

    return (
        <View style={styles.container}>
            <HeaderContent />
            <CustomText text="Digite seu e-mail e senha para acessar sua conta" />
            <TextInput 
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />  
            <Button label='Login' onPress= {() => navigation.navigate('Home')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16, 
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 8,
      },
});

export default LoginScreen;