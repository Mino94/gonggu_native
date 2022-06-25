import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector, useNavigate } from "react-redux";
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, Button, Pressable } from "react-native"
import { boardSelect } from "../../store/board/mainboard";
import mainboard from './../../store/board/mainboard';
import { categorySelect } from './../../store/category/category';


const bucket = "imagestore-39fb6.appspot.com";

const Home = ({ navigation }) => {

	const dispatch = useDispatch();
	const mainboard = useSelector((state) => state.mainboard);

	const [ categoryIndex, setCategoryIndex ] = React.useState(0);
	const [text, setText] = useState();
	useEffect(() => {
		dispatch(boardSelect({ title: "" }));
	}, []);

	return (
		<View style={styles.bgcolor}>
			<CategoryList
				categoryIndex={categoryIndex}
				setCategoryIndex={setCategoryIndex}
				setText={setText}
				/>
			<Search
				categoryIndex={categoryIndex}
				text={text}
				setText={setText}
				/>
			<FlatList
				columnWrapperStyle={{justifyContent: 'space-around'}}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
				marginTop: 10,
				paddingBottom: 250,
				marginBottom: 200,
				}}
				numColumns={2}
				data={mainboard.data}
				renderItem={({ item }) => <Card item={item} navigation={navigation}/>}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default Home;

const CategoryList = ({ categoryIndex, setCategoryIndex, setText}) => {

	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(categorySelect());
	}, []);

	const handleOnClick = (categoryId, title) => {
		dispatch(boardSelect({ categoryId: categoryId, title: "" }));
		setText('')

	};

	return (
		<>
		<View style={styles.categoryContainer}>
			<TouchableOpacity
				key={0}
				onPress={() => {
					setCategoryIndex(0)
					handleOnClick()
				}}
			>
				<Text
					style={[
						styles.categoryText,
						categoryIndex == 0 && styles.categoryTextSelected,
					]}>전체
				</Text>
			</TouchableOpacity>

			{category.data.map((item, idx) => (
				<TouchableOpacity
					key={idx+1}
					onPress={() => {
						setCategoryIndex(idx+1)
						handleOnClick(idx+1)
					}}
					>
					<Text
						style={[
							styles.categoryText,
							categoryIndex == idx+1 && styles.categoryTextSelected,
						]}>
						{item.name}
					</Text>
				</TouchableOpacity>
			))}
		</View>
		</>
	);
};


const Search = ({ categoryIndex, text, setText }) => {

	const dispatch = useDispatch();

	const handleOnClick = (title) => {
		setText(title)
		if(categoryIndex !== 0) {
			dispatch(boardSelect({
				title: title,
				categoryId: categoryIndex
			}))
		} else {
			dispatch(boardSelect({
				title: title
			}));
		}
	};

	return (
		<View style={{marginTop: 10, alignItems: 'center'}}>
			<View style={styles.searchContainer}>
				<View style={styles.imgSearch}>
					<Image
						style={styles.isSearch}
						source={require('../../../assets/images/search_icon.png')}
					></Image>
				</View>
				<View style={styles.searchbar}>
					<TextInput
						placeholder="내가 원하는 공동구매를 찾아보세요!"
						style={styles.textInput}
						value={text}
						onChangeText={handleOnClick}
					></TextInput>
				</View>
			</View>
		</View>
	);
  };


const Card = ({ item, navigation }) => {
	const bucket = "imagestore-39fb6.appspot.com";
	const onPressDetailHandle = () => {
		navigation.navigate('Detail', {id: item.id});
	}
	return (
		<View>
			<TouchableOpacity onPress={onPressDetailHandle}>
				<View style={styles.container}>
					{
						<View  style={styles.card}>
							<Image
								style={styles.image}
								source={{uri:`https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${item.img}?alt=media`}}
							/>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.mem}>{item.currentCount} / {item.maxCount}</Text>
							<Text style={styles.price}>{item.price} 원</Text>
							<Text style={styles.day}>마감: {item.endDate}</Text>
						</View>
					}
				</View>
			</TouchableOpacity>
		</View>
	);
  };


const styles = StyleSheet.create({
	bgcolor: {
		backgroundColor: 'white'
	},
	container: {
		//flex: 1,
		justifyContent: "space-around",
		//marginBottom: 10,
		//paddingBottom: 100

	},
	categoryContainer: {
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 20,
		marginLeft: 20,
		marginRight: 20,
		justifyContent: "space-evenly"
	},
	categoryText: {
		fontSize: 16,
		color: 'grey',
		fontWeight: 'bold',
	},
	categoryTextSelected: {
		color: '#1E4119',
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderColor: 'green'
	},
	searchContainer: {
		backgroundColor: '#D2E1C8',
		width: '70%',
		height: 40,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	isSearch: {
		height: 18, width: 18,
		marginLeft: 10
	},
	imgSearch: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchbar: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 10,
	},
	textInput: {
		padding: 10,
	},
	card: {
	 	height:250,
		width: 175,
		backgroundColor: '#F6F4E5',
		marginHorizontal: 0,
		borderRadius: 10,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 15,
	},
	image: {
		height: 100,
		width: 145,
		padding: 15,
	},
	title: {
		marginTop: 5,
		fontSize: 14,
		fontWeight: "900",
	},
	mem: {
		marginTop: 15,
		textAlign: "right"
	},
	price: {
		marginTop: 15
	},


})
