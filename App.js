import React, { useCallback, useState } from 'react';
import { Provider } from "react-redux";
import store from './src/store/store';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import FullNavigation from './src/screens/navigation/FullNavigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {

	//로그인 했을 때 MEMBER_TOKEN 테이블에 넣기
	const checkToken = async () => {
		const fcmToken = await messaging().getToken();
		if(fcmToken) {
			console.log(fcmToken);
		}
	}
	checkToken();

	// Foreground 상태인 경우
	React.useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert(JSON.stringify(remoteMessage.notification.title), JSON.stringify(remoteMessage.notification.body));
		});
		return unsubscribe;
	});

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<FullNavigation/>
				</View>
			</SafeAreaView>
		</Provider>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default App;
