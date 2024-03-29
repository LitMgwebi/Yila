import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import baseUrl from "../../hooks/baseUrl";
import { useState, useEffect } from "react";
import FlipSlider from "../../components/pageStructure/FlipSlider";

function ConceptRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.stateId;
    const { user } = useAuthContext();
    const [payload, setPayload] = useState({
        title: "",
        article: "",
        pieces: "",
    });
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/concept/${id}`
        }).then((res) => {
            const update = {
                title: res.data.concept.title,
                article: res.data.concept.article,
                pieces: res.data.concept.pieces
            }
            setPayload(payload => ({
                ...payload,
                ...update
            }));
            setStatus(res.data.message);
            setLoad(false);
    console.log(payload.pieces);
        }).catch((error) => {
            setLoad(false);
            setStatus(error.response.data.error);
            console.error(error.message);
        })
    }, [id]);

    const handleConfirm = () => {
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }

    async function handleDelete() {
        setLoad(true)
        try {
            const res = await axios({
                method: "DELETE",
                url: `${baseUrl}/concept/${id}`,
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            setStatus(res.data.message)
            setLoad(false)
        } catch (error) {
            setStatus(error.response.data.error);
            console.log(error.message);
            setLoad(false);
        }
        navigate("/concept")
    }

    return (
        <div id="Record">
            <div className="section">

                <h2 className="ProjectHeader">{payload.title}</h2>

                <div className="button-group">
                    <Link to="/concept/"><button className="btn btn-secondary">Back</button></Link>
                    {user &&
                        <button onClick={handleConfirm} className="btn btn-danger">
                            Delete
                        </button>
                    }
                </div>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            <div className="information">
                <div className="conceptDescription">
                    <p >{payload.article}</p>
                </div>
                <div className="conceptSlider">
                    <FlipSlider pieces={payload.pieces} title={payload.title} />
                </div>
            </div>
        </div>
    );
}

export default ConceptRecord;