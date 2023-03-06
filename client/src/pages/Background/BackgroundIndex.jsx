import BackgroundCard from "../../components/Cards/BackgroundCard";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../hooks/baseUrl";
import { Card } from "@material-ui/core";
import BackgroundAdd from "../../components/Forms/BackgroundAdd";

function BackgroundIndex() {
    const [payloads, setPayloads] = useState(null);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/background`
        }).then((res) => {
            if (res.data.background.length > 0) {
                setPayloads(res.data.background);
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
                <ProjectHeader header="Background Art" link="/" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>
            <div className="information">
                {payloads ? payloads.map((payload, i) => {
                    return (
                        <BackgroundCard payload={payload} />
                    );
                }) :
                    <div className="information">Whole lot of nothing</div>}
            </div>


            <Card className="createCard">
                <BackgroundAdd />
            </Card>


        </div>
    )
}

export default BackgroundIndex;