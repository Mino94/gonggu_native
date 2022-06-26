import React, { useCallback, useState } from 'react';
import { Provider } from "react-redux";
import store from './src/store/store';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button, AsyncStorage, Alert } from 'react-native';
import FullNavigation from './src/screens/navigation/FullNavigation';
import messaging from '@react-native-firebase/messaging';

const App = () => {

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
// const styles = StyleSheet.create({
// 	container: {
// 	  flex: 1,
// 	  backgroundColor: "#8a9a7f",
// 	  alignItems: "center",
// 	  justifyContent: "center",
// 	},
//   });
