import React from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button } from 'react-native';
import { Provider } from 'react-redux';
import MainNavigation from './src/screens/navigation/MainNavigation';
import store from './src/store/store';
import RegisterScreen from './src/screens/User/RegisterScreen';
import LoginScreen from './src/screens/User/LoginScreen';
import LoginNavigation from './src/screens/navigation/LoginNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
	console.log("여기는 app");
  return (
	<Provider store={store}>
		<MainNavigation/>
	</Provider>
  );
};

export default App;
const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#8a9a7f",
	  alignItems: "center",
	  justifyContent: "center",
	},
  });