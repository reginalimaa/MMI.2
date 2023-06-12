import { StyleSheet, View, Image, Text} from "react-native"; 

import logo from '../assets/logo.png'

const HeaderContent = () => {
    return(
        <View style={styles.header}>
            <Image style={{ height: 55, width: 55 }} source={logo} />
            <View style={{ width: 3, backgroundColor: '#FFF', height: "85%" }} />
            <Text style={{ color: "#FFF" }}>PRVNTV</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        height: 87,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "black",
        paddingHorizontal: 18,
        gap: 8
      
    },
})

export default HeaderContent;