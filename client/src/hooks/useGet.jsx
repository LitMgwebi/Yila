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
            setPayloads(res.data[dest]);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.log(error.message)
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
            setPayloads(res.data[dest]);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.error(error.message);
            setStatus(error.message);
            setLoad(false);
        });
    }, [id, dest])

    return { payloads, status, load }
}

function useGetFineArt() {
    const [landscapes, setLandscapes] = useState(null);
    const [others, setOthers] = useState(null);
    const [portraits, setPortraits] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/fineArt/`,
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }).then((res) => {
            setLandscapes(res.data.landscape);
            setOthers(res.data.other);
            setPortraits(res.data.portrait);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.log(error.message)
            setStatus(error.response.data.error);
            setLoad(false);
        });
    }, []);
    return { landscapes, others, portraits, status, load }
}

const useGetFineArtUnsecure = (id) => {
    const [landscapes, setLandscapes] = useState(null);
    const [others, setOthers] = useState(null);
    const [portraits, setPortraits] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);
    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/fineArt/list`,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            params: {
                creatorId: id
            }
        }).then((res) => {
            setLandscapes(res.data.landscape);
            setOthers(res.data.other);
            setPortraits(res.data.portrait);
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            console.error(error.message);
            setStatus(error.message);
            setLoad(false);
        });
    }, [id])

    return { landscapes, others, portraits, status, load }
}
export { useGet, useGetUnsecure, useGetFineArt, useGetFineArtUnsecure };