import axios from "axios";
import baseUrl from "./baseUrl";

const GetAll = async(dest) => {
    let errorMessage = null;
    let status = null;
    let payload = null;

    try{
        const res = await axios({
            method: "GET",
            url: `${baseUrl}/${dest}`
        })

        payload = res.data[dest];
        status = res.data.message
    }catch(error){
        status = error.response.data.error;
        errorMessage = error.message;
        console.log(error)
    }

    return {payload, error, status}
}

export {GetAll}