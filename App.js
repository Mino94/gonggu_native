import React from 'react';
import { Provider } from "react-redux";
import store from './src/store/store';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';
import FullNavigation from './src/screens/navigation/FullNavigation';

const App = () => {
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
