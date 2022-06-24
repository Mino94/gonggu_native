import React from 'react';
import store from './src/store/store';
import MainNavigation from './src/screens/navigation/MainNavigation';
import { Provider } from "react-redux";
import { SafeAreaView, StyleSheet, View } from 'react-native';

const App = () => {
  return (
<Provider store={store}>
    <SafeAreaView style={styles.container}>
		<View style={styles.container}>
			<MainNavigation></MainNavigation>
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
