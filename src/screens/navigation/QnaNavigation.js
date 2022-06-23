import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../qna/Home';
import QnaList from '../qna/QnaList';

const Stack = createBottomTabNavigator();

const QnaNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="QnaList" component={QnaList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default QnaNavigation;
