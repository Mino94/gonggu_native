import React from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';
import FullNavigation from './src/screens/navigation/FullNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
		<View style={styles.container}>
			<FullNavigation/>
		</View>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default App;
