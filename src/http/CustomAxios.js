import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = 'http://localhost:8080';

const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
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