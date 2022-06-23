import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
//import { useDispatch } from "react-redux/es/exports";
const RegisterScreen =()=>{
    //const dispatch=useDispatch();
    const onSubmit=()=>{
        // dispatch(login(user));
        console.log('wow')
    }

    return (
        <ScrollView>
        <View style={styles.form}>
   
            <Image source={ require('../../../assets/logo.png')} style={{ width: 180, height: 130 ,marginTop:70}}></Image>
            <Text style={styles.textLogin}>Register</Text>
            <Text style={styles.tab}>              </Text>
            <TextInput style={styles.inputBox} placeholder="     ID" placeholderTextColor='white'/>
            <TextInput style={styles.inputBox} placeholder="     PW" placeholderTextColor='white' />
            <TextInput style={styles.inputBox} placeholder="     PW check" placeholderTextColor='white' />
            <TextInput style={styles.inputBox} placeholder="     Name" placeholderTextColor='white'/>
            <View style={{flexDirection:"row"}}>
                <TextInput style={styles.addBtn} placeholder="     Post Code" placeholderTextColor='white' />
                <TouchableHighlight  onPress={onSubmit}> 
                    <Text style={{backgroundColor: '#d6d9c6',color:'#34532d',padding:13,textAlign:'center',fontSize: 17,width: 155,height:45,borderRadius: 30,flexDirection:"row", justifyContent:"center", marginLeft:10  }} >search</Text>
                </TouchableHighlight> 
            </View>
            <TextInput style={styles.inputBox} placeholder="     Address" placeholderTextColor='white' />
            <View style={{flexDirection:"row"}}>
                <TextInput style={styles.addBtn} placeholder="     상세주소" placeholderTextColor='white'/>
                <TextInput style={styles.addBtn1} placeholder="     참고사항" placeholderTextColor='white' />
            </View>
            <TextInput style={styles.inputBox} placeholder="     Tel" placeholderTextColor='white' />
            <View style={{flexDirection:"row"}}>
                <TextInput style={{backgroundColor:'#b1b9ac', marginBottom:10,width: 115,height:45,borderRadius: 30,color:'#d6d9c6',marginLeft:10,}} //
                            placeholder="     Bank" placeholderTextColor='white'/>
                <TextInput style={{backgroundColor:'#b1b9ac',marginBottom:10,width: 195,height:45,borderRadius: 30,color:'#d6d9c6', marginLeft:10,} } //
                            placeholder="     Account" placeholderTextColor='white' />
            </View>
            <TouchableHighlight  onPress={onSubmit}> 
                <Text style={styles.loginButton}>REGISTER</Text>
            </TouchableHighlight> 
            <Text style={styles.tab}>              </Text>
            <TouchableHighlight  onPress={onSubmit}> 
                <Text style={styles.joinButton}>JOIN</Text>
            </TouchableHighlight> 
        </View>
        </ScrollView>
    )
}

export default RegisterScreen;

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
        fontSize:25,
        marginRight:210,
    },
    inputBox:{
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 320,
        height:45,
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
        height:45,
        borderRadius: 30,
    },
    joinButton:{
        backgroundColor: '#d6d9c6',
        color:'#34532d',
        padding:13,
        textAlign:'center',
        fontSize: 17,
        width: 320,
        height:45,
        borderRadius: 30,
        marginBottom:100,
    },
    addBtn:{
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 155,
        height:45,
        borderRadius: 30,
        color:'#d6d9c6',
       
    },
    addBtn1:{
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 155,
        height:45,
        borderRadius: 30,
        color:'#d6d9c6',
       marginLeft:10,
    },
})
    
