import { Card } from "@material-ui/core";
import OutputFineArt from "./OutputFineArt";
import { useGet } from "../../hooks/useGet";
import FineArtAdd from "../../components/Forms/FineArtAdd";
import { useAuthContext } from "../../hooks/useAuthContext";

function FineArtIndex() {
    const { payloads, status, load } = useGet("fineArt");
    const { user } = useAuthContext();
    return (
        <div id="Index">
            <div className="section">
                <h1>Fine Art</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            {payloads === null ? <div className="information">Whole lot of nothing</div>
                : <OutputFineArt payloads={payloads} />}

            {user && <Card className="createCard">
                <FineArtAdd />
            </Card>}
        </div>
    )
}

export default FineArtIndex;