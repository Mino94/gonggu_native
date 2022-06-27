import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import { mypageSelect } from "../../store/mypage/mypage";

const MyPageDetailScreen = ({navigation, route}) => {
    //console.log("data >>>" + JSON.stringify(route.params.data))
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{route.params.title}</Text>
            <View style={styles.postBlock}>

                <FlatList ListHeaderComponent={
                    <View style={styles.listTitleBlock}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ fontWeight: "600" }}>목차</Text>
                            <Text style={{ fontWeight: "600" }}>제목</Text>
                            <Text style={{ fontWeight: "600" }}>진행 상황</Text>
                        </View>
                    </View>
                }
                    data={route.params.data}
                    renderItem={({item, index}) => <RenderItem index={index} item={item} navigation={navigation}/>}
                    keyExtractor={(item) => item.id}
                    />

            </View>
		</View>
    )
 }

export default MyPageDetailScreen;


const RenderItem = ( {item, navigation, index} ) => {
    //console.log("item >>>" + JSON.stringify(item));
    const makeZeroNumber = (number) => {
        if (Number(number) < 10) {
            return "0" + number;
        }
        return number;
    };

    const compareDate = (endDate, cCount, mCount) => {
        let now = new Date();
        let ingState = false;
        let nowDate =
            now.getFullYear() +
            "-" +
            makeZeroNumber(now.getMonth() + 1) +
            "-" +
            makeZeroNumber(now.getDate());

        if (nowDate <= endDate && cCount < mCount) {
            ingState = true;
        }
        return ingState;
    };

	const onPressMoveToDetail = () => {
		navigation.navigate("Detail", {id: item.id})
	}

    return (
        <View style={styles.listBlock}>
            <TouchableOpacity onPress={onPressMoveToDetail}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View>
                        <Text style={{fontWeight:"bold"}}>{index+1}</Text>
                    </View>
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                    <View>
                        {compareDate(item.endDate, item.currentCount, item.maxCount) ?
                            (<Text style={{ color: "#6495ED", fontWeight: "bold" }}>진행중</Text>)
                            :
                            (<Text style={{ color: "#DC143C", fontWeight: "bold" }}>마감</Text>)}
                        {/* <Text>{item.done}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        //justifyContent:"center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical:30
    },
    postBlock: {
        backgroundColor:"#F7F4E3",
        width: 300,
        height: 550,
        padding:20,
        borderRadius: 25,
        paddingTop: 30,
        paddingBottom:10,
        justifyContent: "center",
        alignItems: "center",
        //paddingRight:0
    },
    listBlock: {
        borderWidth: 1,
        borderColor: "#0D4212",
        borderRadius: 40,
        width: 250,
        height: 30,
        justifyContent:"center",
        paddingHorizontal: 10,
        backgroundColor: "#faf9ef",
        marginBottom:13
    },
    listTitleBlock: {
        borderWidth: 1,
        borderColor: "#0D4212",
        borderRadius: 40,
        width: 250,
        height: 30,
        justifyContent:"center",
        paddingHorizontal: 10,
        backgroundColor: "#cbddc2",
        marginBottom: 13
    }

})
