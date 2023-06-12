import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import HeaderContent from '../components/header';

const Homee = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.maquina);

  const fetchData = () => {
    fetch('http://192.168.0.102:3000/')
      .then((res) => res.json())
      .then((results) => {
        dispatch({ type: 'ADD_DATA', payload: results });
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch((err) => {
        Alert.alert('Something went wrong');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderCard = ({ item }) => {
    return (

        <Card style={styles.card}>
          <Card.Title title={`ID: ${item._id}`} />
          <Card.Content>
            <Text>Nome: {item.nome}</Text>
            <Text>Localização: {item.localizacao}</Text>
          </Card.Content>
        </Card>
     
    );
  };

  return (
    <View style={styles.container}>
      <HeaderContent />
     
      <View style={styles.cardContainer}>
        <ScrollView>
          <FlatList
            data={data}
            renderItem={renderCard}
            keyExtractor={(item) => item._id}
            onRefresh={fetchData}
            refreshing={loading || false}
          />
        </ScrollView>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    
    marginTop: 130, // Altura do headerContent
    marginBottom: 10,
  },
  card: {
    marginVertical: 10,
  },
});

export default Homee;
