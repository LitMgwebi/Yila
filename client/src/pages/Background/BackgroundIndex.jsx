import BackgroundCard from "../../components/Cards/BackgroundCard";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import { Card } from "@material-ui/core";
import BackgroundAdd from "../../components/Forms/BackgroundAdd";
import useGet from "../../hooks/useGet";

function BackgroundIndex() {
    const {payloads, status, load} = useGet("background")
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