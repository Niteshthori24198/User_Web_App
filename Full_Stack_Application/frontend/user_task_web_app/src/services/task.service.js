const BaseUrl = `${import.meta.env.VITE_APP_SERVER_URL}`;
import axios from "axios";
import { getData, storeTotalTaskCount } from "../utils/handlestorage";

export const fetchTasks = async (taskname, page, limit) => {
    try {
        const response = await axios.get(
            `${BaseUrl}/api/user/task/get?taskname=${taskname}&page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${getData("userInfo")?.token}`,
                },
            }
        );
        let totalTaskCount = response.headers.get('X-Total-Count');
        storeTotalTaskCount("totalTaskCount", totalTaskCount);
        return [true, response];
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [false, error.response]
    }
}

export const addNewTask = async (task) => {

    try {

        const response = await axios.post(
            `${BaseUrl}/api/user/task/create`,
            task,
            {
                headers: {
                    Authorization: `Bearer ${getData("userInfo")?.token}`,
                },
            }
        )
        return [true, response]
    } catch (error) {
        console.log("Error while Adding task", error)
        return [false, error.response]
    }

}


export const updateTask = async (taskId, payload) => {
    try {
        await axios.patch(
            `${BaseUrl}/api/user/task/update/${taskId}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${getData("userInfo")?.token}`,
                },
            }
        )

        return [true, null]
    } catch (error) {
        console.log("Error while updating status :", error);
        return [false, error.response]
    }
}


export const deleteTasks = async (taskId) => {
    try {
        await axios.delete(
            `${BaseUrl}/api/user/task/delete/${taskId}`,
            {
                headers: {
                    Authorization: `Bearer ${getData("userInfo")?.token}`,
                },
            }
        )

        return [true, null]
    } catch (error) {
        console.log("Error while deleting task :", error);
        return [false, error.response]
    }
}