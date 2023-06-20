import { Camera, CameraType } from "expo-camera";
import { useEffect, useState, } from "react";

import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from '@react-navigation/native';

import {
  Alert,
  Linking,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

import { Entypo } from '@expo/vector-icons';
import HeaderContent from "../components/header";
import CustomText from "../components/text";

export default function QRCode() {
  const navigation = useNavigation()

  const [typeCam, setTypeCam] = useState(CameraType.back);
  const [permission, requestPermission] = useState({});
  const [scanned, setScanned] = useState(false);

  const onScanned = async ({ type, data }) => {
    setScanned(true);

    function scannerReady() {
      setTimeout(Timeout, 2000);

      function Timeout() {
        setScanned(false);
      }
    }
    const goLink = async () => {
      scannerReady();

      Linking.openURL(data).catch((e) => console.log(e));
    };
    Alert.alert("You want open link?", `${data}`, [
      {
        text: "Cancel",
        onPress: () => scannerReady(),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => goLink(),
      },
    ]);
  };
  const getBarCodeScannerPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    requestPermission(status);
    console.log(status)
  };
  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderContent />
        </View>

        <CustomText text={'Aponte a camera para o QR Code'} />
        <View style={{ flex: 1, alignItems: 'center' }}>
          {
            permission === 'granted' ?
              <Camera

                type={typeCam}

                style={{ width: "70%", height: 260 }}

                onBarCodeScanned={scanned ? undefined : onScanned}
                barCodeScannerSettings={{
                  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
              /> : <View style={{ width: "70%", height: 260, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={getBarCodeScannerPermissions}>
                  <Text style={{ textAlign: 'center', fontWeight: '600' }}>Você não possui permissão para acessar a camera, clique aqui para pedir permissão</Text>
                </TouchableOpacity>
              </View>
          }

          <TouchableOpacity style={{
            width: 160,
            height: 36,
            backgroundColor: '#04bc64',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4
            , marginTop: 24,
            elevation: 6
          }}>
            <Text style={{ color: "#FFF", fontWeight: '600' }}>Scanner QR Code</Text>
          </TouchableOpacity>

        </View>
        <View
          style={{
            backgroundColor: "#000",
            width: "100%",
            height: 50
          }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    gap: 32

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
  selectTitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: 700
  }, buttonContainer: {

    flex: 1,
    paddingHorizontal: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
    gap: 60
  },
  buttonNavigate: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: "#EEEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {

    fontWeight: 400,
    fontSize: 16,
    alignSelf: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  }

})
