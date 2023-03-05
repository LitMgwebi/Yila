import AnimationTemplate from "../../components/pageStructure/AnimationTemplate";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import {useState, useEffect} from "react";
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
            setLoad(false);
            navigate("/animation")
        }).catch((error) => {
            console.error(error.message);
            setLoad(false);
            setStatus(error.response.data.error);
        });
    }
    return (
        <div id="Record">
            <div className="controls">
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}


                <div className="button-group">
                    <button className="btn btn-secondary"><Link to="/animation/">Back</Link></button>
                        <button onClick={handleConfirm} className="btn btn-danger">
                            Delete
                        </button>
                </div>
            </div>
            <div className="information">
                <h2>{payload.title}</h2>
                <p>{payload.article}</p>
                <img src={payload.preview} alt={payload.title} />
                <AnimationTemplate payload={payload} />
            </div>
        </div>
    )
}

export default AnimationRecord;