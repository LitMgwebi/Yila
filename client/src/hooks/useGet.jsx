import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "./baseUrl";

function useGet(dest) {
    const [payloads, setPayloads] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/${dest}/`,
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then((res) => {
            console.log(res.data);
            setPayloads(res.data[dest]);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.log(error)
            setStatus(error.response.data.error);
            setLoad(false);
        });
    }, [dest]);
    return { payloads, status, load }
}

const useGetUnsecure = (dest, id) => {
    const [payloads, setPayloads] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/${dest}/list`,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                creatorId: id
            }
        }).then((res) => {
            console.log(res.data);
            setPayloads(res.data[dest]);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.error(error);
            setStatus(error.response.data.error);
            setLoad(false);
        });
    }, [id, dest])

    return { payloads, status, load }
}
export { useGet, useGetUnsecure };