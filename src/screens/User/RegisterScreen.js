import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigate } from "react-router-dom";
import { checkUserId, create, init } from "../../store/login/login";
import Postcode from '@actbase/react-daum-postcode';
import { withSafeAreaInsets } from "react-native-safe-area-context";
import { CustomAxios } from "../../http/CustomAxios";
const RegisterScreen =({ navigation })=>{
    const dispatch = useDispatch();
  const join = useSelector((state) => state.login);

  const onChangeHandler =(name, value) => {

    setUser({ ...user, [name]: value });
  };

  const onPressMoveToLogin = () => {
	navigation.navigate("Login");
  }

  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    postcode: "",
    address1: "",
    address2: "",
    address3: "",
    tel: "",
    bank: "",
    bankaccount: "",
  });


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      { label: "NH농협", value: "농협" },
      { label: "국민은행", value: "국민" },
      { label: "신한은행", value: "신한" },
      { label: "우리은행", value: "우리" },
      { label: "카카오뱅크", value: "카카오" },
      { label: "대구은행", value: "대구" },
  ])

  const onChangeHandlerPw = (name, value) => {

    if (value == user.password) {
      setIsPwSame(true);
      //setUser({ ...user, [name]: value });
    } else {
      setIsPwSame(false);
    }
  };


  const onClickHandler = () => {
    setIsPostOpen(true);
  };
  const [isAddress, setIsAddress] = useState("");
  const [isAddress1, setIsAddress1] = useState("");

  const [isZoneCode, setIsZoneCode] = useState("");
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isPwSame, setIsPwSame] = useState(false);

  useEffect(() => {
    if(join.isSignedUp) {
		dispatch(init());
		navigation.navigate("Login");
	}
  }, [join]);

  const [enableJoin, setEnableJoin] = useState(false);
  const onCheckUserId=()=>{
	CustomAxios(
		`user/checkId/${user.userId}`,
		"get"
	).then((result) => {
		if(!result) {
			alert("중복된 아이디 입니다.");
			setEnableJoin(result);
		}else {
			alert("사용할 수 있는 아이디 입니다.");
			setEnableJoin(result);
		}
	})
  }

  const onSubmitJoin = (e) => {
    e.preventDefault();

	if(!enableJoin) {
		alert("아이디 중복 검사를 다시하세요.");
		return;
	}

	if(user.userId==""||user.password==""||isZoneCode==""||isAddress==""||isAddress1==""|| user.tel==""||value==""||user.bankaccount=="")
    {
      alert("정보를 기입해주세요");
    }
    else{
    dispatch(
      create({
        userId: user.userId,
        password: user.password,
        name: user.name,
        postcode: isZoneCode,//isZoneCode,
        address1: isAddress,//isAddress,
        address2: user.address2,
        address3: isAddress1,
        tel: user.tel,
        bank: value,
        bankaccount: user.bankaccount,
      }),
    );
	alert("회원가입됐습니다");
	}
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: 50,
    width: 400,
    height: 500,
    padding: 7,
  };

    return (
        <ScrollView>
        <View style={styles.form}>

            <Image source={ require('../../../assets/logo.png')} style={{ width: 180, height: 130 ,marginTop:70}}></Image>
            <Text style={styles.textLogin}>Register</Text>
            <Text style={styles.tab}>              </Text>
            <View  style={{flexDirection:"row"}}>
			<TextInput style={styles.addBtn} onChangeText={(value) => onChangeHandler("userId", value)} placeholder="ID" placeholderTextColor='white'/>
            <TouchableHighlight  onPress={onCheckUserId}>
                    <Text style={{backgroundColor: '#d6d9c6',color:'#34532d',padding:13,textAlign:'center',fontSize: 17,width: 155,height:45,borderRadius: 30,flexDirection:"row", justifyContent:"center", marginLeft:10  }} >ID 중복 확인</Text>
                </TouchableHighlight>
			</View>
			<TextInput style={styles.inputBox} secureTextEntry={true} onChangeText={(value) => onChangeHandler("password", value)} placeholder="PW" placeholderTextColor='white' />
            <TextInput style={styles.inputBox} secureTextEntry={true} onChangeText={(value) => onChangeHandlerPw("passwordconfirm", value)} placeholder="PW check" placeholderTextColor='white'/>
            {isPwSame ? (
                <View>
                  <Text style={{marginBottom:10,fontSize: 10,marginLeft: 185,color: "#1E4119",}}>
                    {"      "}
                    비밀번호가 일치합니다.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{marginBottom:10,fontSize: 10,marginLeft: 170,color: "red",}}>
                    {"    "}
                    비밀번호가 일치하지않습니다.
                  </Text>
                </View>
              )}
            <TextInput style={styles.inputBox} onChangeText={(value) => onChangeHandler("name", value)} placeholder="Name" placeholderTextColor='white'/>
            <View style={{flexDirection:"row"}}>
                <TextInput style={styles.addBtn} value={isZoneCode} placeholder="Post Code" placeholderTextColor='white' />
                <TouchableHighlight  onPress={onClickHandler}>
                    <Text style={{backgroundColor: '#d6d9c6',color:'#34532d',padding:13,textAlign:'center',fontSize: 17,width: 155,height:45,borderRadius: 30,flexDirection:"row", justifyContent:"center", marginLeft:10  }} >search</Text>
                </TouchableHighlight>
                {isPostOpen ? (

                  <>
                  <Modal animationType="slide">

                      <TouchableOpacity
                          style={{ marginTop: 100, marginBottom: 20, marginLeft: 40 }}
                          onPress={() => setIsPostOpen(false)}>
                          <View style={styles.modalBtn}>
                              <Text style={{ color: "#F6F4E5" }}>창 종료</Text>
                          </View>
                      </TouchableOpacity>
                      <Postcode
                          style={{ marginLeft: 30, width: 320, height: 600 }}
                          jsOptions={{ animation: true, hideMapBtn: true }}
                          onSelected={data => {
                              setIsZoneCode(data.zonecode);


                              if (data.userSelectedType === 'R') {
                                  setIsAddress(data.roadAddress);
                                  if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                    setIsAddress1(data.bname);

                                      if (data.buildingName !== '' && data.apartment === 'Y') {
                                        setIsAddress1((prev) => {
                                              return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                                          });
                                      }
                                  } else {
                                    setIsAddress1('');
                                  }
                              } else {
                                  setIsAddress(data.jibunAddress);
                              }
                              setIsPostOpen(false);
                          }} />
                  </Modal>
              </>

                ) : null}
            </View>
            <TextInput style={styles.inputBox} value={isAddress} placeholder="Address" placeholderTextColor='white' />
            <View style={{flexDirection:"row"}}>
                <TextInput style={styles.addBtn} onChangeText={(value) => onChangeHandler("address2", value)} placeholder="상세주소" placeholderTextColor='white'/>
                <TextInput style={styles.addBtn1} value={isAddress1} placeholder="참고사항" placeholderTextColor='white' />
            </View>
            <TextInput style={styles.inputBox} onChangeText={(value) => onChangeHandler("tel", value)} placeholder="Tel" placeholderTextColor='white' />

            {/* <View style={{flexDirection:"row"}}> */}
            <DropDownPicker
                        dropDownDirection="BOTTOM"
                        dropDownContainerStyle={{ paddingLeft:20,borderRadius: 30,borderColor:'#b1b9ac',backgroundColor: "#b1b9ac" , width:320,marginLeft:36}}
                        style={{ backgroundColor:'#b1b9ac',
                        paddingLeft:20,
                        marginBottom:10,
                        width: 320,
                        height:45,
                        borderRadius: 30,
                        placeholderTextColor:'white',
                        borderColor:'#b1b9ac',
                        marginLeft:36}}
                        placeholder="bank"

                        //placeholderTextColor='white'
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
						listMode={"SCROLLVIEW"}
                        />
			<Text style={styles.tab}>      </Text>
            <TextInput style={styles.inputBox}
            onChangeText={(value) => onChangeHandler("bankaccount", value)} placeholder="Account" placeholderTextColor='white' />

            <TouchableHighlight  onPress={onSubmitJoin}>
                <Text style={styles.loginButton}>REGISTER</Text>
            </TouchableHighlight>
            <Text style={styles.tab}>              </Text>
            <TouchableHighlight  onPress={onPressMoveToLogin}>
                <Text style={styles.joinButton}>LOGIN</Text>
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
        fontSize:5,
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
        paddingLeft:20,
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 320,
        height:45,
        borderRadius: 30,
        color:'white',

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
        paddingLeft:20,
        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 155,
        height:45,
        borderRadius: 30,
        color:'white',

    },
    addBtn1:{
      paddingLeft:20,

        backgroundColor:'#b1b9ac',
        marginBottom:10,
        width: 155,
        height:45,
        borderRadius: 30,
        color:'white',
       marginLeft:10,
    },
    postCodeStyle : {
      display: "block",
      position: "absolute",
      top: 50,
      width: 400,
      height:500,
      padding: 7,
    },
    modalBtn: {
        backgroundColor: "#1E4119",
        width: "18%",
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    }

})

