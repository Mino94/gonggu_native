import React from 'react';
import { View, Text, Image, ScrollView, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import IndexNavigate from '../../../Downloads/posco_native-main-2/src/screens/navigation/IndexNavigate';
import FullNavigation from './src/screens/navigation/FullNavigation';
import { Provider } from "react-redux"
import store from "./src/store/store"

const App = () => {
  return (
    <Provider store={store}>
      {/* <SafeAreaView style={styles.container}> */}
        <View style={styles.container}>
          <FullNavigation/>
        </View>
      {/* </SafeAreaView> */}
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
});

export default App;
