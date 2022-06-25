import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = 'http://localhost:8080';

export const storeToken = async () => {
	try {
		await AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZXhwIjoxNjU2MjE1MzYyfQ.OP2s-r3wfO38a-Etn4sQldXzlvL1kolg2sp31_gFv1g');
		await AsyncStorage.setItem('id', '5');
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
		return err;
	}
}

export const CustomAxios = async (url, method, data) => {
	storeToken();
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
	storeToken();
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

