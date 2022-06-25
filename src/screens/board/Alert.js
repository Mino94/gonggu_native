import React from "react";
import { Alert } from "react-native";

export const oneButtonAlert = (title, content) => new Promise((resolve, reject) => {
	Alert.alert(
		title,
		content,
		[
			{
				text: "확인",
				onPress: () => resolve()
			}
		],
		{cancelable: false}
	)
})

export const twoButtonAlert = (title, content) => new Promise((resolve, reject) => {
	Alert.alert(
		title,
		content,
		[
			{
				text: "취소",
				onPress: () => reject(),
				style: "cancel"
			},
			{
				text: "확인",
				onPress: () => resolve()
			}
		],
		{cancelable: false}
	)
})

