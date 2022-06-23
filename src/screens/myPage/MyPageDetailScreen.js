import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const MyPageDetailScreen = (data) => {
    //console.log(data.props.title)
    const [post, setPost] = useState([
        { id: 1, title: "짱구 좋아요", done: "진행중" },
        { id: 2, title: "흰둥이 좋아요", done: "마감" },
        { id: 3, title: "유리 좋아요", done: "진행중" },
        { id: 4, title: "짱구 좋아요", done: "진행중" },
        { id: 5, title: "흰둥이 좋아요", done: "false" },
        { id: 6, title: "유리 좋아요", done: "true" },
        { id: 7, title: "짱구 좋아요", done: "진행중" },
        { id: 8, title: "흰둥이 좋아요", done: "마감" },
        { id: 9, title: "유리 좋아요", done: "진행중" },
        { id: 10, title: "짱구 좋아요", done: "진행중" },
        { id: 11, title: "흰둥이 좋아요", done: "false" },
        { id: 12, title: "유리 좋아요", done: "true" },
        { id: 13, title: "짱구 좋아요", done: "진행중" },
        { id: 14, title: "흰둥이 좋아요", done: "마감" },
        { id: 15, title: "유리 좋아요", done: "진행중" },
        { id: 16, title: "짱구 좋아요", done: "진행중" },
        { id: 17, title: "흰둥이 좋아요", done: "false" },
        { id: 18, title: "유리 좋아요", done: "true" },
    ]) 

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.props.title}</Text>
            <View style={styles.postBlock}>
            
                <FlatList ListHeaderComponent={
                    <View style={styles.listTitleBlock}>
                        <View style={{ flexDirection: "row", justifyContent:"space-around"}}>
                            <Text style={{fontWeight:"600"}}>목차</Text>
                            <Text style={{fontWeight:"600"}}>제목</Text>
                            <Text style={{fontWeight:"600"}}>진행 상황</Text>
                        </View>
                    </View>
                }
                    data={post} renderItem={renderItem} keyExtractor={(item) => String(item.id)} />
               
            </View>
		</View>
    )
 }

export default MyPageDetailScreen;

const renderItem = ({ item }) => {
    //console.log(item);
    return (
        <View style={styles.listBlock}>
            <TouchableOpacity>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <View>
                        <Text>{item.id}</Text>
                    </View>
                    <View>
                        <Text>{item.title}</Text>
                    </View>
                    <View>
                        <Text>{item.done}</Text>
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