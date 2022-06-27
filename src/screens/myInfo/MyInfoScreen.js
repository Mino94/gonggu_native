import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { mypageSelect } from "../../store/mypage/mypage";
import { AsyncStorage } from '@react-native-community/async-storage';
import { removeToken } from "../../http/CustomAxios";
import { getToken } from './../../http/CustomAxios';
import { init } from "../../store/login/login";
const MyInfoScreen = ({ navigation }) => {
    
    //토큰 지정
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
    const mypage = useSelector((state) => state.mypage);
    const dispatch = useDispatch();

    console.log("info에서 mypage 불러오기 >>>> ", mypage)
    const data = mypage.data


    
    // useEffect(() => {
    //     dispatch(mypageSelect())
    // }, [data.update])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>내 정보</Text>
            <View style={styles.box1}>
                <Image source={require("../../../assets/person.png")} resizeMode="contain" style={styles.imageStyle}></Image>
                <Text style={{ fontSize: 18, marginLeft: 5 }}>안녕하세요, {data.userId}님 '◡'🌿</Text>
            </View>
            <View style={styles.box2}>
                {/* <MyInfoButton title="마이 페이지" navigation={navigation} /> */}
                <MyInfoButton title="내 정보 수정" data={data} navigation={navigation} />
                <MyInfoButton title="로그아웃" navigation={navigation}/>
            </View>
        </View>
    )
}

export default MyInfoScreen;

const MyInfoButton = ({ title, data, navigation }) => {
    const dispatch = useDispatch();
    const goLogout=()=>{
        removeToken();
        dispatch(init());
        navigation.reset({routes: [{name: "Login"}]});
        
       
    }
    if (title=="로그아웃")
    {
        return(
        <TouchableOpacity style={styles.btnContainer} onPress={goLogout} >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
       
        )
        
        
    }
    else{
        console.log(data);
        return (
            <TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('MyInfoDetail', { data: data })} >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
    
        )
    }
   
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
        height:40
    }

})
