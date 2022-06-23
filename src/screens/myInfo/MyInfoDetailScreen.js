import React, { useState } from "react"
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import Postcode from '@actbase/react-daum-postcode';

const MyInfoDetailScreen = () => {
    const [name, setName] = useState("")
    const [postcode, setPostcode] = useState("");
    const [addr1, setAddr1] = useState("");
    const [addr2, setAddr2] = useState("");
    const [addr3, setAddr3] = useState("");
    const [tel, setTel] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "NH농협", value: "NH" },
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
                    <Postcode
                        style={{marginTop: 80, marginLeft:30,width: 320, height: 600 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={data => {
                            setPostcode(data.zonecode);
                            setAddr1('');
                            setAddr3('');
                            
                            if(data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                                setAddr1(data.roadAddress);

                            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                                setAddr3(data.bname);
                                // 건물명이 있고, 공동주택일 경우 추가한다.

                            if (data.buildingName !== '' && data.apartment === 'Y') {
                                setExtraAddr((prev) => {
                                    return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                                });
                            }
                            } else {
                                setExtraAddr('');
                            }
                            } else {
                                // 사용자가 지번 주소를 선택했을 경우(J)
                                setExtraAddr(data.jibunAddress);
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

    return (
        <View style={styles.container}>
            {/* <ScrollView> */}
            <Text style={styles.title}>내 정보 수정</Text>
            <View style={styles.box1}>
                <Image source={require("../../../assets/person.png")} resizeMode="contain" style={styles.imgStyle}></Image>
                <Text style={{fontSize:20, marginLeft:8}}>안녕하세요, userId님 '◡'💚</Text>
            </View>
            <View style={styles.box2}>
                
                <View style={styles.listBlock}>
                <TextInput
                    placeholder="이름"
                        value={name}
                    onChangeText={setName} />
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
                        //mode="BADGE"
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
                        setItems={setItems} />
                </View>
                <View style={[styles.listBlock, {marginTop:6}]}>
                    <TextInput
                        placeholder="bank_account"
                        value={bankAccount}
                        onChangeText={setBankAccount} />
                </View>
                 
            </View>
            <DaumPost/>
            <TouchableOpacity style={[styles.btn2, {marginTop:20, marginLeft:0} ]}>
                <Text style={{color:"#F6F4E5CC"}}>수정 완료</Text>
            </TouchableOpacity>
           
        </View>
    )
}



export default MyInfoDetailScreen

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        alignItems: "center",
        backgroundColor: "white"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom:15
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
        marginTop: 20,
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
        marginBottom:10
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
        marginBottom: 10,
        marginLeft:18
    }

})