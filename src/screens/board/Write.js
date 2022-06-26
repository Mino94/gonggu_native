import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RichText from "./RichText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary  } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import board, { create, init, updateData } from "../../store/board/board";
import { oneButtonAlert } from "./Alert";
import { boardSelect } from "../../store/board/mainboard";

const Write = ({ navigation, route }) => {

	const dispatch = useDispatch();

	const boardId = route.params ? route.params.id : null; // 수정할 때만 들어옴

	const storeBoard = useSelector((state) => state.board);

	const [open, setOpen] = useState(false); //카테고리 visible, unvisible

	const categoryList = useSelector(state => state.category);
	let tempCategory = [];
	categoryList.data.map((item) => {
		tempCategory.push({label: item.name, value: item.id})
	})

	const [category, setCategory] = useState(tempCategory);

	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); //datepicker visible, unvisible

	const [datas, setDatas] = useState({
		title: '',
		content: '',
		endDate: '마감날짜',
		categoryId: null,
		maxCount: '',
		price: '',
		img: null,
		imgName: '이미지 첨부'
	});

	const showDatePicker = () => {
		setIsDatePickerVisible(true);
	}

	const hideDatePicker = () => {
		setIsDatePickerVisible(false);
	}

	const handleConfirm = (datetime) => {
		const date = `${datetime.getFullYear()}-${parsingNumber(datetime.getMonth() + 1)}-${parsingNumber(datetime.getDate())}`
		setDatas({...datas, endDate: date});
		hideDatePicker();
	}

	const parsingNumber = (num) => {
		if(num < 10) return '0' + num;
		else return num;
	}

	const onTextChanged = (e, name) => {
		setDatas({ ...datas, [name] : e.replace(/[^0-9]/g, '')});
	}

	const uploadImage = async () => { //TODO : 이미지 등록 수정
		const result = await launchImageLibrary();
		if(result.didCancel) {
			return null;
		}
		const loadUri = result.assets[0].uri;
		const imageFile = {
			uri: result.assets[0].uri,
			type: result.assets[0].type,
			name: result.assets[0].fileName
		}
		setDatas({...datas, file: imageFile, imgName: imageFile.name});
	}

	const onChangeHandler = (value, name) => {
		setDatas({...datas, [name]: value});
	}

	const setCategoryId = (callback) => {
		setDatas(state => ({...datas, categoryId: callback(state.value)}))
	}

	const onPressHandler = () => {
		const formData = new FormData();
		for (let [key ,value] of Object.entries(datas)) {
			if(key === 'imgName' && value === '이미지 첨부') {
				continue;
			}
			if(key === 'img' && value === null) {
				continue;
			}
			formData.append(key, value);
		}
		dispatch(create(formData));
	}

	const onPressUpdateHandler = () => {
		const formData = new FormData();
		for (let [key ,value] of Object.entries(datas)) {
			if(key === 'img' && value === null) {
				continue;
			}
			if(key === 'imgName') {
				continue;
			}
			if(key === 'regDate') {
				continue;
			}
			formData.append(key, value);
		}
		formData.append('id', boardId);
		dispatch(updateData(formData));
	}

	useEffect(() => {
		async function Alert() {
			const rst = await oneButtonAlert('저장완료', '');
			navigation.navigate('Detail', {id: storeBoard.data.id});
			dispatch(init());
		}
		if(storeBoard.success && !storeBoard.loading) {
			dispatch(boardSelect({ title: "" }));
			Alert();
		}
	}, [storeBoard]);

	useEffect(() => {
		if(route.params) { //route.params가 존재할 경우(수정일경우)
			setDatas({...storeBoard.data, img: null, imgName: (storeBoard.data.imgName ? storeBoard.data.imgName : "이미지 첨부")});
		}
	}, [])


	return (
		<ScrollView style={styles.board}>
			<TextInput
				style={styles.inputBox}
				placeholder="제목"
				placeholderTextColor={"#000"}
				onChangeText={(value) => onChangeHandler(value, "title")}
				value={datas.title}/>
			<DropDownPicker
				style={styles.inputBox}
				open={open}
				value={datas.categoryId}
				items={category}
				setOpen={setOpen}
				setValue={setCategoryId}
				setItems={setCategory}
				placeholder="카테고리"
				listMode={"SCROLLVIEW"}
			/>
			<TextInput
				style={styles.inputBox}
				placeholder="모집인원"
				placeholderTextColor={"#000"}
				keyboardType="numeric"
				onChangeText= {(e) => onTextChanged(e, "maxCount")}
				value={datas.maxCount.toString()}/>
			<TextInput
				style={styles.inputBox}
				placeholder="가격"
				placeholderTextColor={"#000"}
				keyboardType="numeric"
				onChangeText= {(e) => onTextChanged(e, "price")}
				value={datas.price.toString()}/>
			<Text style={styles.inputText} placeholderTextColor={"#000"} onPress={showDatePicker}>{datas.endDate}</Text>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
			<RichText setDatas={setDatas} datas={datas}/>
			<Text style={styles.inputText} placeholderTextColor={"#000"} onPress={uploadImage}>{datas.imgName}</Text>
			{route.params ?
			<TouchableOpacity style={styles.button} onPress={onPressUpdateHandler}>
				<Text style={{color: "#F7F4E3"}}>수정하기</Text>
			</TouchableOpacity>
			:
			<TouchableOpacity style={styles.button} onPress={onPressHandler}>
				<Text style={{color: "#F7F4E3"}}>작성하기</Text>
			</TouchableOpacity>
			}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	board: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	inputText: {
		height: 50,
		paddingHorizontal: 10,
		borderWidth: 0,
		borderRadius: 25,
		paddingHorizontal: 20,
		marginVertical: 5,
		backgroundColor: '#D2E1C8',
		overflow:'hidden',
		paddingTop: 15
	},
	inputBox: {
		height: 50,
		paddingHorizontal: 10,
		borderWidth: 0,
		borderRadius: 30,
		paddingHorizontal: 20,
		marginVertical: 5,
		backgroundColor: '#D2E1C8'
	},
	button: {
		marginVertical: 5,
		height: 50,
		backgroundColor: "#1E4119",
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default Write;
