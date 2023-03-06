import ConceptCard from "../../components/Cards/ConceptCard";
import { Link } from "react-router-dom";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import baseUrl from "../../hooks/baseUrl";
import axios from "axios";
import { useEffect, useState } from "react";

function ConceptIndex() {
    const [payloads, setPayloads] = useState(null);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/concept`
        }).then((res) => {
            if (res.data.concept.length > 0) {
                setPayloads(res.data.concept);
                setStatus(res.data.message);
            } else {
                setStatus("There are no entries in the database")
            }
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            setLoad(false);
            console.log(error.message)
        });
    }, []);
    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Concept Art" link="/" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="button-group">
                    <button className="btn btn-light"><Link to="/concept/add">+</Link></button>
                </div>
            </div>
            <div className="information">
                {payloads ? payloads.map((payload, i) => {
                    return (
                        <ConceptCard payload={payload} />
                    );
                })
                    : <div className="information">Whole lot of nothing</div>}
            </div>
        </div>
    );
}

export default ConceptIndex;