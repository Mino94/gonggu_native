import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RichText from "./RichText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary  } from "react-native-image-picker";

const Write = () => {

	const [open, setOpen] = useState(false);

	const [value, setValue] = useState(null);
	const [category, setCategory] = useState([
		{label: "apple", value: "APPLE"},
		{label: "banana", value: "BANANA"}
	]);

	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	const [endDate, setEndDate] = useState('마감날짜');

	const [datas, setDatas] = useState({
		title: '',
		content: '',
		endDate: '',
		categoryId: '',
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
		setEndDate(date);
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
		const uriPath = loadUri.split("//").pop();
		const imageName = loadUri.split("/").pop();
		setDatas({...datas, imgName: imageName});
		console.log(loadUri);
		console.log(imageName);
	}

	return (
		<ScrollView style={styles.board}>
			<TextInput style={styles.inputBox} placeholder="제목" placeholderTextColor={"#000"}/>
			<DropDownPicker
				style={styles.inputBox}
				open={open}
				value={value}
				items={category}
				setOpen={setOpen}
				setValue={setValue}
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
			<Text style={styles.inputText} placeholderTextColor={"#000"} onPress={showDatePicker}>{endDate}</Text>
			<DateTimePickerModal
				isVisible={isDatePickerVisible}
				mode="date"
				onConfirm={handleConfirm}
				onCancel={hideDatePicker}
			/>
			<RichText/>
			<Text style={styles.inputText} placeholderTextColor={"#000"} onPress={uploadImage}>{datas.imgName}</Text>
			<TouchableOpacity style={styles.button}>
				<Text style={{color: "#F7F4E3"}}>작성하기</Text>
			</TouchableOpacity>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	board: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff"
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
