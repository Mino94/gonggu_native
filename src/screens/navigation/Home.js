import React from "react";
import { Button, Text, View } from "react-native"

const Home = ({navigation}) => {

	return (
		<View>
			<Button
				title="Detail 열기"
				onPress={() => navigation.navigate('Detail')}
			/>
			<Button
				title="Write 열기"
				onPress={() => navigation.navigate('Write')}
			/>
		</View>
	)
}

export default Home;
