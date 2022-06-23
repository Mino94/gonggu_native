import React from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Progress from 'react-native-progress';

const Detail = () => {
	return (
		<View style={{flex: 1}}>
			<ScrollView>
				<View style={styles.userId}>
					<Text>작성자 : user_id</Text>
				</View>
				<View style={styles.boardImg}>
					<Image
						style={{ width: 350, height: 350, borderColor: "black", borderWidth: 1}}
						source={require('../../../assets/images/jjang.jpeg')}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.info}>
					<View style={styles.info1}>
						<Text style={styles.dDay}>D-21</Text>
					</View>
					<View>
						<Text style={styles.title}><Text>짱구 티셔츠 공동구매 하실분~!!</Text></Text>
					</View>
					<View style={styles.textRight}>
						<Text style={{fontSize: 22}}>16 </Text><Text style={styles.maxCount}>/30</Text>
					</View>
					<Progress.Bar style={{marginVertical: 5}} progress={0.3} width={330} color={"#1E4119"}/>
					<View style={styles.textRight}>
						<Text style={styles.price}>8000</Text><Text style={styles.won}> 원</Text>
					</View>
					<View style={{marginTop: 10}}>
						<Text style={{fontSize: 18}}>
							sdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsd
							sdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsd
							sdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsdsdfjiosdjfoisfjisfsdfsd
						</Text>
					</View>
				</View>
			</ScrollView>
			<View style={styles.bottomButton}>
				<TouchableOpacity style={styles.button}>
					<Text style={{color: "#1E4119", fontSize: 18}}>댓글보기</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={{color: "#1E4119", fontSize: 18}}>참여하기</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	userId: {
		alignItems: 'flex-end',
		paddingVertical: 10,
		paddingRight: 20
	},
	boardImg: {
		height: 350,
		alignItems: "center",
	},
	info: {
		paddingHorizontal: 30,
		paddingVertical: 10,
	},
	info1: {
		flexWrap: 'wrap',
		paddingVertical: 5
	},
	dDay: {
		backgroundColor: '#1E4119',
		paddingVertical: 5,
		paddingHorizontal: 20,
		marginBottom: 5,
		borderRadius: 13,
		overflow: 'hidden',
		color: 'white'
	},
	title: {
		fontSize: 25,
		marginBottom: 10
	},
	textRight: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	maxCount: {
		fontSize: 14,
		paddingTop: 5,
		color: '#d9d9d9'
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	won: {
		fontSize: 14,
		paddingTop: 5
	},
	bottomButton: {
		flexDirection: "row",
		justifyContent: "space-around",
		height: 45,
		backgroundColor: "#1E4119",
		shadowOpacity: 0.2
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		backgroundColor: '#F6F4E5',
		margin: 7
	}
})

export default Detail;
