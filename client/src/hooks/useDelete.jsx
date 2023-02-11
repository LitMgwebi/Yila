import axios from "axios";
import baseUrl from "./baseUrl";

const useDelete = async(dest) => {
    let errorMessage = null;
    let status = null;

    try{
        const res = await axios({
            method: "DELETE",
            url: `${baseUrl}/${dest}`,
            // headers: {
            //     'Authorization': `Bearer ${user.token}`
            // }
        })

        status = res.data.message
    }catch(error){
        status = error.response.data.error;
        errorMessage = error.message;
        console.log(error)
    }

    return {payload, error, status}
}

export default useDelete;