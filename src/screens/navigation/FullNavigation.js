import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator}  from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { BackHandler, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Board from '../board/Board';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyPageScreen from '../myPage/MyPageScreen';

import Notification from '../notification/Notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyPageDetailScreen from '../myPage/MyPageDetailScreen';
import MyInfo from '../myInfo/MyInfoScreen';
import MyInfoScreen from '../myInfo/MyInfoScreen';
import MyInfoDetailScreen from '../myInfo/MyInfoDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
	return(
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Home"
				component={Board}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="MyPage"
				component={MyPageScreen}
			/>
			<Stack.Screen name="MyJoin">
					{props => <MyPageDetailScreen {...props} props={{ "title": "공구 참여 현황" }}/>}
			</Stack.Screen>
			<Stack.Screen name="MyPost">
					{props => <MyPageDetailScreen {...props} props={{ "title": "나의 공구 모집" }}/>}
			</Stack.Screen>
			<Stack.Screen
				name="MyInfo"
				component={MyInfo}
			/>
		</Stack.Navigator>
	);
}

const MyPageStackNavigation = () => {
	return(
		<Stack.Navigator initialRouteName="MyPage" screenOptions={{headerShown:false}}>
			<Stack.Screen
				name="MyPage"
				component={MyPageScreen}
			/>
			<Stack.Screen name="MyJoin">
					{props => <MyPageDetailScreen {...props} props={{ "title": "공구 참여 현황" }}/>}
			</Stack.Screen>
			<Stack.Screen name="MyPost">
					{props => <MyPageDetailScreen {...props} props={{ "title": "나의 공구 모집" }}/>}
			</Stack.Screen>
			<Stack.Screen
				name="MyInfo"
				component={MyInfo}
			/>
		</Stack.Navigator>
	);
}

const MyInfoStackNavigation = () => {
	return (
		<Stack.Navigator initialRouteName="MyInfo" screenOptions={{headerShown:false}}>
			<Stack.Screen
				name="MyInfo"
				component={MyInfoScreen}
			/>
			<Stack.Screen
				name="MyInfoDetail"
				component={MyInfoDetailScreen}
			/>
		</Stack.Navigator>
	)
}

const FullNavigation = () => {
	return (
		<NavigationContainer>
			<Header />
			<Tab.Navigator initialRouteName="Board" screenOptions={{tabBarActiveTintColor: "#0D4212", tabBarShowLabel:false, tabBarStyle:{shadowOpacity:0.2}, headerShown:false}}>
				<Tab.Screen name="Left" component={NavigateBefore} options={{ tabBarIcon: ({color, size}) => (<Icon name='navigate-before' color={color} size={size} />) }} />
				<Tab.Screen name="Right" component={NavigateNext} options={{ tabBarIcon: ({color, size}) => (<Icon name="navigate-next" color={color} size={size} />) }} />
				<Tab.Screen name="Board" component={StackNavigation} options={{ tabBarIcon: ({color, size}) => (<Icon name="home" color={color} size={size} />) }} />
				<Tab.Screen name="Mypage" component={MyPageStackNavigation} options={{ tabBarIcon: ({color, size}) => (<Icon name="format-list-bulleted" color={color} size={size} />) }} />
				<Tab.Screen name="Notification" component={Notification} options={{ tabBarIcon: ({color, size}) => (<Icon name="notifications" color={color} size={size} />)  }}/>
				<Tab.Screen name="MyInfo" component={MyInfoStackNavigation}options={{ tabBarIcon: ({color, size}) => (<Icon name="mood" color={color} size={size} />)  }}/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default FullNavigation

const Header = () => {
	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
    if (Platform.OS == 'android') { //android setting
        StatusBar.setBackgroundColor('#1E4119', true)
    } 
	
	return (
		<>
        	<View style={[styles.statusBarPlaceholder, {height:top}]} />
        	<StatusBar barStyle="light-content" /> 
			<View style={styles.block}>
				<Image source={require('../../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
				<TouchableOpacity onPress={()=>navigation.navigate('MyInfo')}>
					<Image source={require('../../../assets/person.png')} style={styles.topButton} resizeMode="contain" />
				</TouchableOpacity>
			</View>
        </>
    )
}

const NavigateBefore = () => {
	const navigation = useNavigation();
	if (navigation?.canGoBack()) { 
		navigation.goBack()
		return true
	}
	return false
}

const NavigateNext = () => {
	const navigation = useNavigation();
	if (navigation?.canGoBack()) { 
		navigation.goBack()
		return true
	}
	return false
}


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
		width:55,
		height: 40,
	},
	topButton: {
		width: 40,
		height: 28,
		marginBottom:10
		
	}

})