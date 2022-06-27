import React, { useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { mypageSelect } from "../../store/mypage/mypage";
import AsyncStorage from "@react-native-community/async-storage";

const MyPageScreen = ({ navigation }) => {
    const mypage = useSelector((state) => state.mypage);
    const dispatch = useDispatch();
    console.log("mypage >>> " + JSON.stringify(mypage));

    useEffect(() => {
        async function get() { 
            try {
                await AsyncStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjU2MjYwNDExfQ.G_NZAZiU0Gh4qrlhyD2V2q8rg6N5aawhYr_dlNnlBZk")
            } catch (error) {
                console.log("error >>> " + error) 
            }
        }
        get();
        dispatch(mypageSelect())
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>마이 페이지</Text>
            <View style={styles.rectangle}>
                <MyPageButton title="공구 참여 현황" id="1" data={mypage.myJoinList} navigation={navigation} />
                <MyPageButton title="나의 공구 모집" id="2" data={mypage.myPost} navigation={navigation} />
            </View>
        </View>
    )
}

const MyPageButton = ({title, id, data, navigation}) => { 
    
    const linkto = id == 1 ? "MyJoin" : "MyPost";
  
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.push(linkto, {title:title, data:data}) } >
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