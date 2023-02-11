import axios from "axios";
import baseUrl from "./baseUrl";

async function usePost(data, user, dest) {
    let errorMessage = null
    let status = null;
    let payload = null;

    try {
        const res = await axios({
            method: "POST",
            url: `${baseUrl}/${dest}`,
            data: data,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${user.token}`,
            }
        })

        status = res.data.message
    } catch (error) {
        status = error.response.data.error;
        errorMessage = error.message;
        console.log(error)
    }

    return { payload, error, status }
}

export default usePost;