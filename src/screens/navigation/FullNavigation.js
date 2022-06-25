import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import Detail from "../board/Detail";
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import { Image } from 'react-native';
import Test from './Test';
import Write from '../board/Write';
import JoinList from '../board/JoinList';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const LogoTitle = () => {
	return (
		<Image
			style={{ width: 70, height: 50}}
			source={require('../../../assets/images/logo.png')}/>
	)
}

const StackHomekNavigation = () => {
	return(
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
			/>
			<Stack.Screen
				name="Detail"
				component={Detail}
			/>
			<Stack.Screen
				name="Write"
				component={Write}
			/>
			<Stack.Screen
				name="JoinList"
				component={JoinList}
			/>
		</Stack.Navigator>
	);
}

const FullNavigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Stack">
				<Tab.Screen
					name="Test"
					component={Test}/>
				<Tab.Screen
					name="Stack"
					component={StackHomekNavigation}
					options={{
						title: "",
						headerTitleAlign: "left",
						headerTitle: (props) => <LogoTitle {...props} />,
						headerStyle: {
							backgroundColor: '#34532d',
						}
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default FullNavigation
