import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as Progress from 'react-native-progress';
import RenderHTML from "react-native-render-html";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, init, select } from "../../store/board/board";
import { boardSelect } from "../../store/board/mainboard";
import { mypageSelect } from "../../store/mypage/mypage";
import { create, joinState, remove } from "../../store/participation/participation";
import { oneButtonAlert } from "./Alert";

const Detail = ( {navigation, route} ) => {

	const dispatch = useDispatch();
	const bucket = "imagestore-39fb6.appspot.com";
	const boardId = route.params.id;
	const board = useSelector(state => state.board);
	const joinStatus = useSelector(state => state.participation);
	const progressPercent = board.data.currentCount ? board.data.currentCount / board.data.maxCount : 0;
	const [dDay, setDDay] = useState(0);
	const [userId, setUserId] = useState();

	useEffect(() => {
		async function getUserId() {
			AsyncStorage.getItem("id").then((value) => {
				setUserId(value);
			})
		}
		dispatch(select(boardId));
		dispatch(joinState(boardId));
		getUserId();
	}, []);

	useEffect(() => {
		async function Alert() {
			const rst = await oneButtonAlert('삭제완료', '');
			dispatch(init());
		}
		if(board.delete) {
			navigation.navigate('Home');
			Alert();
		}
		const today = new Date();
		const endDate = new Date(board.data.endDate);
		const gap = today.getTime() - endDate.getTime();
		setDDay(Math.floor(gap / (1000*60*60*24)));
	}, [board])

	useEffect(() => {
		dispatch(select(boardId));
	}, [joinStatus]);

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const onPressJoinHandle = async () => {
		dispatch(create(boardId));
		dispatch(joinState(boardId));
		await sleep(100);
		dispatch(mypageSelect());
		dispatch(boardSelect({ title: "" }));
	}

	const onPressCancelHandle = async () => {
		dispatch(remove(boardId));
		dispatch(joinState(boardId));
		await sleep(100);
		dispatch(mypageSelect());
		dispatch(boardSelect({ title: "" }));
	}

	const onPressShowList = () => {
		navigation.navigate('JoinList', { id: boardId })
	}

	const onPressUpdateHandle = () => {
		navigation.navigate('Write', { id: boardId })
	}

	const onPressDeleteHandle = () => {
		dispatch(deleteData(boardId));
	}

	const onPressToMoveQna = () => {
		navigation.navigate("Qna", { id: boardId });
	}

	return (
		<View style={{flex: 1}}>
			<ScrollView>
				<View style={styles.userId}>
					<Text>작성자 : {board.data.userId}</Text>
				</View>
				<View style={styles.boardImg}>
					<Image
						style={{ width: 350, height: 350, borderColor: "black", borderWidth: 1}}
						source={{uri:`https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${board.data.img}?alt=media`}}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.info}>
					{board.data.userId == userId ?
					<View style={styles.iconButtonView}>
						<TouchableOpacity style={styles.iconButton} onPress={onPressUpdateHandle}><Icon name="mode-edit" size={30}/></TouchableOpacity>
						<TouchableOpacity style={styles.iconButton} onPress={onPressDeleteHandle}><Icon name="delete" size={30}/></TouchableOpacity>
					</View>
					: null}
					<View style={styles.info1}>
						<Text style={styles.dDay}>D{dDay > 0 ? '+' + dDay : dDay == 0 ? '-' + dDay : dDay}</Text>
					</View>
					<View>
						<Text style={styles.title}><Text>{board.data.title}</Text></Text>
					</View>
					<View style={styles.textRight}>
						<Text style={{fontSize: 23}}>{board.data.currentCount} </Text><Text style={styles.maxCount}>/{board.data.maxCount}</Text>
					</View>
					<Progress.Bar
						style={{marginVertical: 5}}
						progress={progressPercent}
						width={330}
						color={"#1E4119"}/>
					<View style={styles.textRight}>
						<Text style={styles.price}>{board.data.price}</Text><Text style={styles.won}> 원</Text>
					</View>
					<View style={{marginTop: 10}}>
						<Text style={{fontSize: 18}}>
							{board.data.content ?
							<RenderHTML
								contentWidth={300}
								source={{html: board.data.content}}
							/> : null}
						</Text>
					</View>
				</View>
			</ScrollView>
			<View style={styles.bottomButton}>
				<TouchableOpacity style={styles.button} onPress={onPressToMoveQna}>
					<Text style={{color: "#1E4119", fontSize: 18}}>댓글보기</Text>
				</TouchableOpacity>
				{board.data.userId == userId ?
				<TouchableOpacity style={styles.button} onPress={onPressShowList}>
					<Text style={{color: "#1E4119", fontSize: 18}}>리스트 보기</Text>
				</TouchableOpacity>
				:
					joinStatus.data ?
					<TouchableOpacity style={styles.button} onPress={onPressCancelHandle}>
						<Text style={{color: "#1E4119", fontSize: 18}}>참여 취소</Text>
					</TouchableOpacity>
					:
						(dDay > 0) ?
						<TouchableOpacity style={styles.buttonFinish} activeOpacity={1}>
							<Text style={{color: "#1E4119", fontSize: 18}}>마감</Text>
						</TouchableOpacity>
						:
						<TouchableOpacity style={styles.button} onPress={onPressJoinHandle}>
							<Text style={{color: "#1E4119", fontSize: 18}}>참여하기</Text>
						</TouchableOpacity>
				}
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
		color: '#AEAEAE'
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
	},
	iconButtonView: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	iconButton: {
		padding: 5
	},
	buttonFinish: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		backgroundColor: '#828282',
		margin: 7
	}
})

export default Detail;
