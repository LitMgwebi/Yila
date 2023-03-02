import CharacterDesignCard from "../../components/Cards/CharacterDesignCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import baseUrl from "../../hooks/baseUrl";

function CharacterDesignIndex() {
    const [payloads, setPayloads] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/characterDesign`
        }).then((res) => {
            if (res.data.characterDesign.length > 0) {
                setPayloads(res.data.characterDesign);
                setStatus(res.data.message);
            } else {
                setStatus("There are no entries in the database")
            }
            setLoad(false);
        }).catch((error) => {
            setLoad(false);
            console.log(error.message);
            setStatus(error.response.data.error);
        });
    });
    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Character Design" link="/" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="addButton">
                    <button className="btn btn-light"><Link to="/character-design/add">+</Link></button>
                </div>
            </div>
            <div className="information">
                {payloads === null ? <div className="information">Whole lot of nothing</div>
                    : payloads.map((payload, i) => {
                        return (
                            <CharacterDesignCard payload={payload} />
                        );
                    })}
            </div>
        </div>
    )

}

export default CharacterDesignIndex;