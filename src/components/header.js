import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather'; // Importe o ícone do pacote react-native-vector-icons/Feather

import logo from '../assets/logo.png';

const HeaderContent = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navigateToMaintenance = () => {
    navigation.navigate('QRCode');
    setMenuOpen(false);
  };

  const navigateToMachines = () => {
    navigation.navigate('MachinesScreen');
    setMenuOpen(false);
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
      <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
        <Icon name="menu" size={35} color="#FFF" />
      </TouchableOpacity>

      <Modal visible={isMenuOpen} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
              <Icon name="x" size={20} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('QRCode')}>
              <View style={styles.menuItem}>
                <Icon name="tool" size={20} color="#FFF" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>Manutenção</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToMachines}>
              <View style={styles.menuItem}>
                <Icon name="settings" size={20} color="#FFF" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>Máquinas</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      top: 4,
      left: 0,
      right: 0,
      height: 87,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 18,
      backgroundColor: 'black',
      justifyContent: 'space-between',
    },
    menuIcon: {
      marginLeft: 10,
    },
    logo: {
      height: 55,
      width: 55,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeButton: {
      alignItems: 'flex-end',
      marginRight: 10,
      marginTop: 10,
    },
    menuContent: {
      flex: 1,
      backgroundColor: '#333',
      paddingVertical: 20,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    menuIcon: {
      marginRight: 10,
    },
    menuLabel: {
      color: '#FFF',
      fontSize: 16,
    },
  });
  
export default HeaderContent;
