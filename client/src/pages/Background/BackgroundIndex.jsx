import BackgroundCard from "../../components/Cards/BackgroundCard";
import { Card } from "@material-ui/core";
import BackgroundAdd from "../../components/Forms/BackgroundAdd";
import { useGet } from "../../hooks/useGet";
import InformationTemplate from "../../components/Forms/InformationTemplate";
import { useAuthContext } from "../../hooks/useAuthContext";

function BackgroundIndex() {
    const { payloads, status, load } = useGet("background");
    const { user } = useAuthContext();
    return (
        <div id="Index">
            <div className="section">
                <h1>Background</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>
            <InformationTemplate payloads={payloads} Card={BackgroundCard} />

            {user &&
                <Card className="createCard">
                    <BackgroundAdd />
                </Card>
            }

        </div>
    )
}

export default BackgroundIndex;