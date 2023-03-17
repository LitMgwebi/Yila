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
            url: `${baseUrl}/${dest}/`
        }).then((res) => {
            if (res.data[dest]) {
                setPayloads(res.data[dest]);
                setStatus(res.data.message);
                console.log(res.data[dest])
            } else {
                setStatus("There are no entries in the database")
            }
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            setLoad(false);
            console.error(error.message);
        });
    }, [dest]);
    return { payloads, status, load }
}

const useGetUnsecure = (dest) => {
    const [payloads, setPayloads] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    axios({
        method: "GET",
        url: `${baseUrl}/${dest}/list`
    }).then((res) => {
        if (res.data[dest].length > 0) {
            setPayloads(res.data[dest]);
            setStatus(res.data.message);
        } else {
            setStatus("There are no entries in the database")
        }
        setLoad(false);
    }).catch((error) => {
        setStatus(error.response.data.error);
        setLoad(false);
        console.error(error.message);
    });

    return { payloads, status, load }
}
export { useGet, useGetUnsecure };