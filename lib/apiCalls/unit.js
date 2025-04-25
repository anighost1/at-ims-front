import axios from "axios"
import Cookies from "js-cookie";

export const fetchUnit = async ({ queryKey }) => {
    const [_key, filter, search] = queryKey;
    const token = Cookies.get('token')

    try {
        if (!token) throw new Error("Token is required")
        const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/master-entry/unit?q=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return data?.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const addUnit = async (dataToSend) => {
    const token = Cookies.get('token')
    try {
        if (!token) throw new Error("Token is required")
        const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/master-entry/unit`, dataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        return data?.data
    } catch (error) {
        console.log(error)
        return null
    }
}