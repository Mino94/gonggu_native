import React from "react";
import { SafeAreaView, Text, View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "../Login/LoginScreen";
import Login from "../Login/LoginScreen";

const Home = () => {
	return (
		<SafeAreaProvider>
			<SafeAreaView style={{flex:1}}>
				<LoginScreen></LoginScreen>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default Home;
