
import axios from 'axios';
import { storeData } from "../utils/handlestorage";
const BaseUrl = `${import.meta.env.VITE_APP_SERVER_URL}`;

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/user/register`, user);
        return [response.data.success, response.data.msg, null];
    } catch (error) {
        console.log("Error occur while register :-", error.response.data.msg);
        return [false, null, error.response.data.msg]
    }
}



export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/user/login`, user);
        if (response.data.success) {
            const userInfo = { token: response.data.token, name: response.data.name }
            storeData("userInfo", userInfo);
            return [true, null];
        } else {
            return [false, response.data.msg]
        }
    } catch (error) {
        console.log("Error occur while login :-", error.response.data.msg);
        return [false, error.response.data.msg]
    }
}


export const forgotUserPassword = async (email) => {

    try {
        const response = await axios.post(`${BaseUrl}/api/user/forgot-password`, { email });
        return [response.data.success, response.data.msg];
    } catch (error) {
        console.log("Error occur while forgot password :-", error.response.data.msg);
        return [false, error.response.data.msg]
    }
}


export const resetUserPassword = async (token, password) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/user/reset-password`, {
            newPassword: password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return [response.data.success, response.data.msg];
    } catch (error) {
        console.log("Error occur while reset password :-", error.response.data.msg);
        return [false, error.response.data.msg]
    }

}