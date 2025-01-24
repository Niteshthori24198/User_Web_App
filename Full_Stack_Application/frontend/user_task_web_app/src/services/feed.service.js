import axios from "axios";
import { getData } from "../utils/handlestorage";
const BaseUrl = `${import.meta.env.VITE_APP_SERVER_URL}`;

export const fetchPosts = async (page) => {
    try {
        const res = await axios.get(`${BaseUrl}/api/user/feed/post/get?page=${page}`, {
            headers: {
                Authorization: `Bearer ${getData('userInfo')?.token}`,
            },
        });
        return [true, res];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [false, error.response]
    }
};



export const createPost = async (data) => {
    try {
        const res = await axios.post(`${BaseUrl}/api/user/feed/post/create`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${getData('userInfo')?.token}`,
            },
        });
        return [true, res];
    } catch (err) {
        console.error("Error creating post:", err);
        return [false, err.response]
    }
}