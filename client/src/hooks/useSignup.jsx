import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import baseUrl from "./baseUrl";
import axios from "axios";

export const useSignup = () => {
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signup = async (data) => {
        setLoad(true);
        setStatus(null);

        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/user/signup`,
                data: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });

            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({ type: 'LOGIN', payload: res.data });
            setLoad(false);
            navigate("/");
        } catch (error) {
            setStatus(error.response.data.error)
            setLoad(false);
        }
    }

    return { signup, load, status }
}