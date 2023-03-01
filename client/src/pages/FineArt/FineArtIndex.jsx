import baseUrl from "../../hooks/baseUrl";
import { Card } from "@material-ui/core";
import ProjectHeader from "../../components/pageStructure/ProjectHeader"
import OutputFineArt from "./OutputFineArt";
import { useState, useEffect } from "react";
import axios from "axios";
import FineArtAdd from "../../components/Forms/FineArtAdd";

function FineArtIndex() {
    const [payloads, setPayloads] = useState(null);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        axios({
            method: "GET",
            url: `${baseUrl}/fineArt`
        }).then((res) => {
            if (res.data.fineArt.length > 0) {
                setPayloads(res.data.fineArt);
                setStatus(res.data.message);
            } else {
                setStatus("There are no entries in the database");
            }
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            setLoad(false)
            console.log(error.message)
        })
    }, [])
    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Fine Art" link="/portfolio" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            {payloads === null ? <div className="information">Whole lot of nothing</div>
                : <OutputFineArt payloads={payloads} />}

            <Card className="createCard">
                <FineArtAdd />
            </Card>
        </div>
    )
}

export default FineArtIndex;