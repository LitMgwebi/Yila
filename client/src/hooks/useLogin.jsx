import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import baseUrl from "./baseUrl";
import axios from "axios";

export const useLogin = () => {
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoad(true);
        setStatus(null);

        const userData = JSON.stringify({ email, password });

        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/user/login`,
                data: userData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            localStorage.setItem('user', JSON.stringify(res.data));
            dispatch({ type: 'LOGIN', payload: res.data });
            setStatus(res.data.message);
            setLoad(false);
            navigate("/");
        } catch (error) {
            setStatus(error.response.data.error);
            setLoad(false);
        }
    }

    return { login, load, status }
}