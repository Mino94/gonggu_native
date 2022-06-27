// import React, { useEffect } from 'react';
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import { BackHandler, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



import MyPageScreen from '../myPage/MyPageScreen';
import Notification from '../notification/Notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPageDetailScreen from '../myPage/MyPageDetailScreen';
import MyInfoScreen from '../myInfo/MyInfoScreen';
import MyInfoDetailScreen from '../myInfo/MyInfoDetailScreen';
import Home from '../board/Home';
import Write from '../board/Write';
import Detail from '../board/Detail';
import JoinList from '../board/JoinList';
import LoginScreen from '../User/LoginScreen';
import RegisterScreen from '../User/RegisterScreen';
import QnaList from '../qna/QnaList';
import { getToken } from '../../http/CustomAxios';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeNavigation = () => {

	const [isLogin, setIsLogin] = useState(false);

	getToken().then((rst) => {
		console.log("rest : ", rst);
		if(rst == null) {
			setIsLogin(false);
		}else {
			setIsLogin(true);
		}
	}).catch((err) => {
		console.log(err);
	});
	console.log("isLogin ? ", isLogin)
	return (
		<NavigationContainer>
			{/* <Header /> */}
			<Stack.Navigator screenOptions={{
				title: "",
				headerStyle: {
					backgroundColor: "#1E4119"
				},
				headerTitle: (props)=> <LogoTitle {...props} />,
				headerTintColor: "#F6F4E5",
				headerTitleAlign:"center"
			}}>
				{isLogin ?
					<Stack.Screen
					name="home1"
					component={BottomTabScreen}
					/>
				:
					<Stack.Screen
					name="Login1"
					component={LoginScreen}
					/>
				}
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					/>
				<Stack.Screen
					name="home"
					component={BottomTabScreen}
					/>
				<Stack.Screen
					name="Join"
					component={RegisterScreen}
				/>
				<Stack.Screen
					name="MyJoin"
				>
					{props => <MyPageDetailScreen {...props} props={{ "title": "공구 참여 현황" }}/>}
				</Stack.Screen>
				<Stack.Screen name="MyPost">
						{props => <MyPageDetailScreen {...props} props={{ "title": "나의 공구 모집" }}/>}
				</Stack.Screen>
				<Stack.Screen
					name="MyInfo"
					component={MyInfoScreen}
				/>
				<Stack.Screen
					name="MyInfoDetail"
					component={MyInfoDetailScreen}
				/>
				<Stack.Screen
					name="Write"
					component={Write}
				/>
				<Stack.Screen
					name="Detail"
					component={Detail}
				/>
				<Stack.Screen
					name="JoinList"
					component={JoinList}
				/>
				<Stack.Screen
					name="Qna"
					component={QnaList}
				/>
			</Stack.Navigator>
		</NavigationContainer>

	)

}


function LogoTitle() {
	const navigation = useNavigation();
	return (
		<TouchableOpacity onPress={()=>navigation.navigate('Home')}>
			<Image source={require('../../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
		</TouchableOpacity>
	)
}


const BottomTabScreen = () => {
	return (
		<>
		<Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false, tabBarActiveTintColor: "#0D4212", tabBarShowLabel:false, tabBarStyle:{shadowOpacity:0.2}}}>
			<Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size}) => (<Icon name="home" color={color} size={size} />) }} />
			<Tab.Screen name="Mypage" component={MyPageScreen} options={{ tabBarIcon: ({ color, size }) => (<Icon name="format-list-numbered" color={color} size={size} />) }} />
			{/* <Tab.Screen name="Left" component={NavigateBefore} options={{ tabBarVisible: false, tabBarIcon: ({ color, size }) => (<Icon name='navigate-before' color={color} size={size} />) }} /> */}
			{/* <Tab.Screen name="Right" component={NavigateNext} options={{ tabBarIcon: ({color, size}) => (<Icon name="navigate-next" color={color} size={size} />) }} />  */}
			<Tab.Screen name="MyInfo" component={MyInfoScreen}options={{ tabBarIcon: ({color, size}) => (<Icon name="mood" color={color} size={size} />)  }}/>
			<Tab.Screen name="Notification" component={Notification} options={{ tabBarIcon: ({color, size}) => (<Icon name="notifications" color={color} size={size} />)  }}/>
		</Tab.Navigator>
		</>

	)

}

export default HomeNavigation;

const styles = StyleSheet.create({
    statusBarPlaceholder: {
        backgroundColor:"#1E4119"
    },
    block: {
        padding: 10,
		backgroundColor: "#1E4119",
		paddingBottom: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent:"space-between"
	},
	logoImage : {
		width:59,
		height: 50,
	},
	topButton: {
		width: 40,
		height: 28,
		marginBottom:10

	}

})
