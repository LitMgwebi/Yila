import AnimationTemplate from "../../components/Forms/AnimationTemplate";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../hooks/baseUrl";

function AnimationRecord() {
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);
    const [payload, setPayload] = useState({
        title: "",
        preview: "",
        article: "",
        movements: "",
        backgrounds: "",
        effects: ""
    });
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.stateId;

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/animation/${id}`
        }).then((res) => {
            const update = {
                title: res.data.animation.title,
                preview: res.data.animation.preview,
                article: res.data.animation.article,
                movements: res.data.animation.movements,
                backgrounds: res.data.animation.backgrounds,
                effects: res.data.animation.effects
            }
            setPayload(payload => ({
                ...payload,
                ...update
            }));
            setLoad(false);
            setStatus(res.data.message);
        }).catch((error) => {
            setLoad(false);
            console.error(error.message)
            setStatus(error.response.data.error);
        })
    }, [id]);

    const handleConfirm = () => {
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }

    function handleDelete() {
        setLoad(true);
        setStatus(null)
        axios({
            method: "DELETE",
            url: `${baseUrl}/animation/${id}`,
            headers: {
                // 'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setStatus(res.data.message)
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            console.error(error.message);
            setLoad(false);
        });
        navigate("/animation")
    }
    return (
        <div id="Record">
            <div className="controls">

                <h2>{payload.title}</h2>
                <div className="button-group">
                    <Link to="/animation"><button className="btn btn-secondary">Back</button></Link>
                    <button onClick={handleConfirm} className="btn btn-danger">
                        Delete
                    </button>
                </div>

                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>
            <div className="information">
                <p>{payload.article}</p>
                <img src={payload.preview} alt={payload.title} />
                <AnimationTemplate payload={payload} />
            </div>
        </div>
    )
}

export default AnimationRecord;