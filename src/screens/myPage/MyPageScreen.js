import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const MyPageScreen = ({ navigation }) => {
    //console.log(navigation)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>마이 페이지</Text>
            <View style={styles.rectangle}>
                <MyPageButton title="공구 참여 현황" id="1" navigation={navigation} />
                <MyPageButton title="나의 공구 모집" id="2" navigation={navigation} />
            </View>
        </View>
    )
}

const MyPageButton = ({title, id, navigation}) => { 
    
    const linkto = id == 1 ? "MyJoin" : "MyPost";
    //console.log(navigation)
    
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.push(linkto) } >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>

    )
}

export default MyPageScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop:60,
        flex: 1,
        alignItems: "center",
        backgroundColor:"white"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 30
    },
    rectangle: {
        borderColor: "#cfd8dc",
        borderWidth: 1,
        width: 300,
        height: 400,
        padding:20,
        borderRadius: 25,
        paddingTop: 30,
        paddingBottom:10,
        justifyContent:"center"
    },
    btnContainer: {
        flex: 1,
        backgroundColor: "#F6F4E5",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        maxHeight: 100,
        marginBottom:40
    },
    buttonText: {
        color: "#1E4119",
        fontSize:22
    }

})