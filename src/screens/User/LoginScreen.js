import React, { useEffect,useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { select } from "../../store/login/login";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
const LoginScreen =({ navigation })=>{
    const dispatch=useDispatch();

    const loginRedux = useSelector((state) => state.login);
    const [user, setUser] = useState({
        userId: "",
        password: "",
      });
      const onChangeTextHandler = (name, value) => {
        setUser({
          ...user,
          [name]: value,
        });

      };

      useEffect(() => {
        console.log(loginRedux);

        if (loginRedux.isLoggedIn) {
            // AsyncStorage.setItem("id", loginRedux.data.id + "");
            // AsyncStorage.setItem("token", loginRedux.data.token);

            navigation.navigate("home");
        }

      }, [loginRedux]);

      const onSubmit = () => {

        dispatch(select({ userId: user.userId, password: user.password }));
      };

	  const onPressMoveToJoin = () => {
		navigation.navigate("Join");
	  }

    return (

        <View style={styles.form}>

            <Image source={ require('../../../assets/logo.png')} style={{ width: 180, height: 130 ,marginTop:70}}></Image>
            <Text style={styles.textLogin}>Login</Text>
            <Text style={styles.tab}>              </Text>
            <TextInput style={styles.inputBox} placeholder="     ID" placeholderTextColor='white'//
                        onChangeText={(value) => onChangeTextHandler("userId", value)}/>

            <TextInput style={styles.inputBox} placeholder="     PW" placeholderTextColor='white' //
                        onChangeText={(value) => onChangeTextHandler("password", value)} secureTextEntry={true}/>

            <TouchableHighlight  onPress={onSubmit}>
                <Text style={styles.loginButton}>LOGIN</Text>
            </TouchableHighlight>
            <Text style={styles.tab}>              </Text>

            <TouchableHighlight  onPress={onPressMoveToJoin}>
                <Text style={styles.joinButton}>JOIN</Text>
            </TouchableHighlight>
        </View>

    )
}

export default LoginScreen;

const styles=StyleSheet.create({
    form:{
        flex:1,
        jusifyContent:'center',
        alignItems:'center',
        backgroundColor:'#8a9a7f',
    },
    tab:{
        fontSize:8,
    },
    imgLogo:{
        width:70,
        height:60,
    },
    textLogin:{
       marginTop:30,
        color:'#d6d9c6',
        fontSize:30,
        marginRight:210,
    },
    inputBox:{
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 320,
        height:50,
        borderRadius: 30,
        color:'#d6d9c6',

    },
    loginButton:{
        backgroundColor: '#34532d',
        color:'#d6d9c6',
        padding:13,
        textAlign:'center',
        fontSize: 17,
        width: 320,
        height:50,
        borderRadius: 30,
    },
    joinButton:{
        backgroundColor: '#d6d9c6',
        color:'#34532d',
        padding:13,
        textAlign:'center',
        fontSize: 17,
        width: 320,
        height:50,
        borderRadius: 30,
    }
})

