import React, { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { joinList } from "../../store/participation/participation";

const datas = [
	{
		id: 1,
		name: '홍길동',
		postcode: '12234',
		address1: '전남 순천시 좌야로',
		address2: '333동 2333호',
		address3: '해룡면',
		tel: '010-2345-2345',
		bank: '카카오뱅크',
		bankaccount: '123-123123-123123-13'
	},
	{
		id: 2,
		name: '방정환',
		postcode: '12234',
		address1: 'aaaaaaa',
		address2: 'bbbbbbbb',
		address3: 'cccccccc',
		tel: '010-2345-2345',
		bank: '카카오뱅크',
		bankaccount: '123-123123-123123-13'
	},
	{
		id: 3,
		name: '안중근',
		postcode: '12234',
		address1: 'aaaaaaa',
		address2: 'bbbbbbbb',
		address3: 'cccccccc',
		tel: '010-2345-2345',
		bank: '카카오뱅크',
		bankaccount: '123-123123-123123-13'
	}
]

const renderItem = ({item}) => {
	return(
		<View style={styles.line}>
			<Text style={styles.name}>{item.name}</Text>
			<Text style={styles.info}>({item.postcode})</Text>
			<Text style={styles.info}>{item.address1} {item.address2} ({item.address3})</Text>
			<Text style={styles.info}>[{item.bank}] {item.bankaccount}</Text>
		</View>
	)
}

const JoinList = ({ navigation, route }) => {

	const participation = useSelector(state => state.participation);
	const dispatch = useDispatch();
	const boardId = route.params.id;

	useEffect(() => {
		dispatch(joinList(boardId));
	}, []);

	return(
		<FlatList
			data={participation.list}
			renderItem={renderItem}
			keyExtractor={item => item.id}
		/>
	)
}

const styles = StyleSheet.create({
	line: {
		margin: 20,
		backgroundColor: '#D2E1C8',
		borderColor: '#34532d',
		borderWidth: 1
	},
	name: {
		fontSize: 22,
		backgroundColor: '#34532d',
		marginBottom: 10,
		paddingLeft: 10,
		paddingVertical: 10,
		color: '#F7F4E3'
	},
	info: {
		fontSize: 18,
		paddingLeft: 10,
		paddingBottom: 10,
	}
});

export default JoinList;
