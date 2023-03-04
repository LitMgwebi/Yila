import AnimationCard from "../../components/Cards/AnimationCard";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import { Link } from "react-router-dom";
import baseUrl from "../../hooks/baseUrl";
import { useState, useEffect } from "react";
import axios from "axios";

function AnimationIndex() {
    const [payloads, setPayloads] = useState(null);
    const [load, setLoad] = useState(true);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/animation`
        }).then((res) => {
            if (res.data.animation.length > 0) {
                setPayloads(res.data.animation);
                setStatus(res.data.message);
            } else {
                setStatus("There are no entries in the database")
            }
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            setLoad(false);
            console.error(error.message);
        });
    }, []);
    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Animation Art" link="/" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="addButton">
                    <button className="btn btn-light"><Link to="/animation/add">+</Link></button>
                </div>
            </div>
            <div className="information">
                {payloads === null ? <div className="information">Whole lot of nothing</div>
                    : payloads.map((payload, i) => {
                        return (
                            <AnimationCard payload={payload} />
                        );
                    })}
            </div>
        </div>
    );
}

export default AnimationIndex