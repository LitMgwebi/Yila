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

    const signup = async (email, password) => {
        setLoad(true);
        setStatus(null);

        const userData = JSON.stringify({ email, password });

        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/user/signup`,
                data: userData,
                headers: {
                    'Content-Type': 'application/json'
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