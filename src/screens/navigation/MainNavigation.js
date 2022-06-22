import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import Home from "./Home";
import Detail from "./Detail";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Home">
				<Tab.Screen name="Home" component={Home}/>
				<Tab.Screen name="Detail" component={Detail}/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default MainNavigation;
