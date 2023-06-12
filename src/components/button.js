import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, onPress}){
  
  return(
        <View style={[styles.buttonContainer, ]}>
             <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
  }


const styles = StyleSheet.create({
    buttonContainer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
    button: {
      borderRadius: 15,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: "#00BF63"
    },
    buttonIcon: {
      paddingRight: 8,
    },
    buttonLabel: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
    },
  });