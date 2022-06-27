import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = 'http://192.168.0.130:8080';

export const storeToken = async (token, id) => {
	try {
		await AsyncStorage.setItem('token', token);
		await AsyncStorage.setItem('id', id + '');
	} catch(err) {
		console.log(err);
	}
}

export const getId = async() => {
	try {
		const id = await AsyncStorage.getItem('id');
		return id;
	} catch(err) {
		return err;
	}
}

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		return token;
	} catch(err) {
		console.log(err);
	}
}

export const CustomAxios = async (url, method, data) => {
    const token = await getToken();
    const response = await axios({
        url,
        method,
        data,
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
	return response.data;
}

export const CustomFileAxios = async (url, method, data) => {
    const token = await getToken();
    const response = await axios({
        url,
        method,
        data,
        headers: {
			'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    });
	return response.data;
}

export const removeToken = async () => {
	try {
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem( 'id' );

	} catch(err) {
		console.log(err);
	}
}
