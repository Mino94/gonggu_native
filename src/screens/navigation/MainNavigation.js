import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../User/LoginScreen"
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import login from "../../store/login/login";
import RegisterScreen from "../User/RegisterScreen";
import LoginNavigation from "./LoginNavigation";
const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    //const isLogin = useSelector((state) => state.users.isLogin);
    //const dispatch = useDispatch();
    //const reLogin = async () => {
      //const user = await AsyncStorage.getItem("user");
      //dispatch(login(JSON.parse(user)));
    //};
    // useEffect(() => {
    //   reLogin();
    // }, []);
    // const Stack = createStackNavigator();
    console.log("여기는 메인네비");
    return (
      <RegisterScreen></RegisterScreen>
    );
}

export default MainNavigation;