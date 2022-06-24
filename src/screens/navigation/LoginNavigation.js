
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../User/LoginScreen";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();
const LoginNavigation = () => {
  console.log("여기는 로그인");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={LoginScreen} ></Stack.Screen>
    
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;