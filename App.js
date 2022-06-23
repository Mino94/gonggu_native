import React from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import IndexNavigate from '../../../Downloads/posco_native-main-2/src/screens/navigation/IndexNavigate';
import FullNavigation from './src/screens/navigation/FullNavigation';
import { Provider } from "react-redux"


const App = () => {
  return (
    <SafeAreaProvider>
      <FullNavigation/>
      {/* <IndexNavigation></IndexNavigation> */}
	</SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
	
});

export default App;
