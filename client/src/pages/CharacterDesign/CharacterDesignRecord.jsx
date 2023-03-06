import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";
import { useState, useEffect } from "react";
import TranslationIndex from "./Translation/TranslationIndex";
import baseUrl from "../../hooks/baseUrl";

function CharacterDesignRecord() {
    const location = useLocation();
    const navigate = useNavigate();
    const [translations, setTranslations] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);
    const [payload, setPayload] = useState({
        nameOfCharacter: "",
        originalCharacter: "",
    });
    const id = location.state.stateId;

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/characterDesign/${id}`
        }).then((res) => {
            const update = {
                nameOfCharacter: res.data.characterDesign.nameOfCharacter,
                originalCharacter: res.data.characterDesign.originalCharacter
            }

            setPayload(payload => ({
                ...payload,
                ...update
            }));
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            setLoad(false);
            setStatus(error.response.data.error)
            console.error(error.message);
        })

        axios({
            method: "GET",
            url: `${baseUrl}/translation/`,
            params: {
                characterDesign: id
            }
        }).then((res) => {
            if (res.data) {
                setTranslations(res.data.translation)
                setStatus(res.data.message);
            } else {
                setStatus("There are no entries in the database")
            }
            setLoad(false);
        }).catch((error) => {
            setLoad(false);
            setStatus(error.response.data.error);
            console.error(error.message);
        });
    }, [id]);

    const handleConfirm = () => {
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }

    function handleDelete() {
        setLoad(true)
        axios({
            method: "DELETE",
            url: `${baseUrl}/characterDesign/${id}`,
            headers: {
                // 'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setLoad(false);
            setStatus(res.data.message);
        }).catch((error) => {
            console.error(error.message);
            setLoad(false);
            setStatus(error.response.data.error);
        });
        navigate("/character-design")
    }

    return (
        <div id="Record">
            <div className="section">
                <h2 id="ProjectHeader">{payload.nameOfCharacter}</h2>
                <div className="button-group">
                    <Link to="/portfolio/character-design/"><button className="btn btn-secondary">Back</button></Link>
                    <button onClick={handleConfirm} className="btn btn-danger">
                        Delete
                    </button>
                </div>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            <div className="information">
                <div className="characterImage">
                    <img src={payload.originalCharacter} alt={payload.nameOfCharacter} />
                </div>
            </div>


            <h3 className="ProjectHeader">Translations</h3>

            <div className="translations">
                {translations && translations.map((translation, i) => {
                    return (
                        <TranslationIndex payload={translation} />
                    );
                })}
            </div>
        </div>
    )
}

export default CharacterDesignRecord;