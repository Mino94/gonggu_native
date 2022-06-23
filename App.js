import React from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/store/store';
import RegisterScreen from './src/screens/User/RegisterScreen';
import LoginScreen from './src/screens/User/LoginScreen';
const App = () => {

  return (
	<Provider store={store}>
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<LoginScreen/>
			</View>
		</SafeAreaView>
	</Provider>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default App;
