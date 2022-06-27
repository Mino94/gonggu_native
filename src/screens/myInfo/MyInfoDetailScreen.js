import React, { useEffect, useState } from "react"
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import Postcode from '@actbase/react-daum-postcode';
import { useDispatch } from "react-redux";
import { updateInfo, mypageSelect } from "../../store/mypage/mypage";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { delay } from "redux-saga/effects";

const MyInfoDetailScreen = (props) => {

    const dispatch = useDispatch();

    //console.log("infodetail에서 mypage 불러오기 >>>> ", mypage)

    //토큰 지정
    // useEffect(() => {
    //     async function get() {
    //         try {
    //             await AsyncStorage.setItem('token', "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNjU2MjAxODA4fQ.cvggmPuzdNdFRPCVSiA1AhYPdEziwfzptSUm5zCuE9g")
    //         } catch (error) {
    //             console.log("error >>> " + error)
    //         }
    //     }
    //     get();
    //     console.log('!!!!!!!!!!!!!!!!!!!!!!before : ' + mypage.myInfo.name)
    //     dispatch(mypageSelect())

    //     console.log('!!!!!!!!!!!!!!!!!!!!!!after : ' + mypage.myInfo.name)

    // }, [])

    //const data= mypage.data
    const data = props.route.params.data
    const navigation = props.navigation
    // console.log(navigation)
    //console.log(navigation)

    const [name, setName] = useState(`${data.name}`)
    const [postcode, setPostcode] = useState(`${data.postcode}`);
    const [addr1, setAddr1] = useState(`${data.address1}`);
    const [addr2, setAddr2] = useState(`${data.address2}`);
    const [addr3, setAddr3] = useState(`${data.address3}`);
    const [tel, setTel] = useState(`${data.tel}`);
    const [bankAccount, setBankAccount] = useState(`${data.bankaccount}`);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(`${data.bank}`);
    const [items, setItems] = useState([
        { label: "NH농협", value: "농협" },
        { label: "국민은행", value: "국민" },
        { label: "신한은행", value: "신한" },
        { label: "우리은행", value: "우리" },
        { label: "카카오뱅크", value: "카카오" },
        { label: "대구은행", value: "대구" },
    ])

    const [isModal, setIsModal] = useState(false);


    const DaumPost = () => {
        return (
            <>
                <Modal
                    animationType="slide"
                    visible={isModal}>
                    <TouchableOpacity
                        style={{ marginTop: 100, marginBottom: 20, marginLeft: 40 }}
                        onPress={() => setIsModal(false)}>
                        <View style={styles.modalBtn}>
                            <Text style={{ color: "#F6F4E5" }}>창 종료</Text>
                        </View>
                    </TouchableOpacity>
                    <Postcode
                        style={{ marginLeft: 30, width: 320, height: 600 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={data => {
                            setPostcode(data.zonecode);
                            setAddr1('');
                            setAddr2('');
                            setAddr3('');

                            if (data.userSelectedType === 'R') {
                                setAddr1(data.roadAddress);
                                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                    setAddr3(data.bname);

                                    if (data.buildingName !== '' && data.apartment === 'Y') {
                                        setAddr3((prev) => {
                                            return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                                        });
                                    }
                                } else {
                                    setAddr3('');
                                }
                            } else {
                                setAddr3(data.jibunAddress);
                            }
                            setIsModal(false);
                        }} />
                </Modal>
            </>

        )

    }

    const onClickHandler = () => {
        setIsModal(true);
    }

    const onSubmitInfo = () => {

        //console.log("여기서 어떻게 들어감? >>> " + name)
        dispatch(
            updateInfo({
                userId: data.userId,
                name: name,
                postcode: postcode,
                address1: addr1,
                address2: addr2,
                address3: addr3,
                tel: tel,
                bank: value,
                bankaccount: bankAccount
            })
        )

        console.log("update된 data" + JSON.stringify(data))
        //dispatch(mypageSelect()); //reset({routes: [{name:"MyInfo"}]})
        Alert.alert('수정 완료 ☺', null, [{text:"확인", onPress:()=> navigation.pop()}])

    }


    return (
        <ScrollView style={{backgroundColor:"white"}}>
        <View style={styles.container}>
            <Text style={styles.title}>내 정보 수정</Text>
            <View style={styles.box1}>
                <Image source={require("../../../assets/person.png")} resizeMode="contain" style={styles.imgStyle}></Image>
                <Text style={{fontSize:20, marginLeft:8}}>안녕하세요, {data.userId}님 '◡'💚</Text>
            </View>
            <View style={styles.box2}>

                <View style={styles.listBlock}>
                <TextInput
                    placeholder="이름"
                        value={name}
                        onChangeText={setName}/>
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <View style={styles.listBlock1}>
                        <TextInput
                            placeholder="우편번호"
                            value={postcode}
                            onChangeText={setPostcode} />
                    </View>
                    <View style={styles.btn1}>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={onClickHandler}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.listBlock}>
                    <TextInput
                        placeholder="addr1"
                        value={addr1}
                        onChangeText={setAddr1} />
                </View>
                <View style={{flexDirection:"row", justifyContent:"space-around" }}>
                    <View style={[styles.listBlock1, {marginRight:20, width:"40%"}]}>
                        <TextInput
                            placeholder="addr2"
                            value={addr2}
                            onChangeText={setAddr2} />
                    </View>
                    <View style={styles.listBlock1}>
                        <TextInput
                            placeholder="addr3"
                            value={addr3}
                            onChangeText={setAddr3} />
                    </View>
                </View>
                <View style={styles.listBlock}>
                    <TextInput
                    placeholder="전화번호"
                        value={tel}
                    onChangeText={setTel} />
                </View>

                <View style={[styles.listBlock, {marginTop:6}]}>
                    <DropDownPicker
                        dropDownDirection="TOP"
                        dropDownContainerStyle={{ backgroundColor: "#faf9ef" }}
                        style={{borderWidth:0, backgroundColor:"transparent"}}
                        listItemContainerStyle={{ height: 30 }}
                        placeholder="bank"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
						listMode={"SCROLLVIEW"}
                        />
                </View>
                <View style={[styles.listBlock, {marginTop:6}]}>
                    <TextInput
                        placeholder="bank_account"
                        value={bankAccount}
                        onChangeText={setBankAccount} />
                </View>

            </View>
            <DaumPost/>
            <TouchableOpacity style={[styles.btn2, {marginTop:20, marginLeft:0} ]} onPress={onSubmitInfo}>
                <Text style={{color:"#F6F4E5", fontWeight:"bold"}}>수정 완료</Text>
            </TouchableOpacity>

            </View>
            </ScrollView>
    )
}



export default MyInfoDetailScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
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
    imgStyle: {
        width: 50,
        height:40
    },
    box2: {
      borderColor: "#cfd8dc",
        borderWidth: 1,
        borderRadius: 25,
        width: "85%",
        height: 400,
        marginTop: 30,
        marginBottom:15,
        paddingHorizontal: 20,
        alignItems:"center",
        paddingTop: 30,
        paddingBottom:10
    },
    listBlock: {
        borderRadius: 40,
        width: "95%",
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#faf9ef",
        marginBottom: 10,

    },
    listBlock1: {
        borderRadius: 40,
        width: "47%",
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#faf9ef",
        marginBottom:10
    },
    btn1: {
        borderRadius: 40,
        width: "40%",
        height: 40,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#D2E1C8CC",
        marginBottom: 10,
        marginLeft:18
    },
    btn2: {
        borderRadius: 40,
        width: "80%",
        height: 40,
        justifyContent: "center",
        alignItems:"center",
        paddingHorizontal: 10,
        backgroundColor: "#1E4119CC",
        marginBottom: 40, ///android에서 틈 작아서 수정
        marginLeft:18
    },
    modalBtn: {
        backgroundColor: "#1E4119",
        width: "18%",
        height: 20,
        alignItems: "center",
        justifyContent: "center"
    }

})
