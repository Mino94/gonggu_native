import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
} from 'react-native';
import MainNavigation from './src/screens/navigation/MainNavigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MainNavigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
