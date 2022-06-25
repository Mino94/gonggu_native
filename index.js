/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

//background, quit 상태인 경우
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
	console.log("Message handled in the background!", remoteMessage);
});
// {"collapseKey": "com.gonggu_app",
// "data": {},
// "from": "283798873084",
// "messageId": "0:1656141181893373%004ca5be004ca5be",
// "notification": {"android": {},
//					"body": "ㅇㅇㅇㅇㅇ",
// 					"title": "테스트!!"},
// "sentTime": 1656141121537, "ttl": 2419200}

AppRegistry.registerComponent(appName, () => App);
