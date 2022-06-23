import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const MyInfoScreen = ({navigation}) => { 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>내 정보</Text>
            <View style={styles.box1}>
                <Image source={require("../../../assets/person.png")} resizeMode="contain" style={styles.imageStyle}></Image>
                <Text style={{fontSize:20, marginLeft:8}}>안녕하세요, userId님 '◡'🌿</Text>
            </View>
            <View style={styles.box2}>
                <MyInfoButton title="내 정보 수정" navigation={navigation} />
                <MyInfoButton title="로그아웃" />
            </View>
        </View>
    )
}

export default MyInfoScreen;

const MyInfoButton = ({title, navigation}) => { 
    
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.push('MyInfoDetail') } >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom:30
    },
    box1: {
        borderColor: "#cfd8dc",
        borderWidth: 1,
        borderRadius: 25,
        width: "85%",
        height: 70,
        flexDirection: "row",
        paddingLeft:20,
        //justifyContent: "center",
        alignItems: "center"
    },
    box2: {
        borderColor: "#cfd8dc",
        borderWidth: 1,
        borderRadius: 25,
        width: "85%",
        height: 400,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom:10
    },
    btnContainer: {
        flex: 1,
        backgroundColor: "#F6F4E5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        height: 200,
        marginBottom:40
    },
    buttonText: {
        color: "#1E4119",
        fontSize:22
    },
    imageStyle: {
        width: 50,
        height:40,
        //backgroundColor:"purple"
    }
    


})