import { Card } from "@material-ui/core";
import { useGetFineArt } from "../../hooks/useGet";
import FineArtAdd from "../../components/Forms/FineArtAdd";
import { useAuthContext } from "../../hooks/useAuthContext";
import InformationTemplate from "../../components/Forms/InformationTemplate";
import FineArtCard from "../../components/Cards/FineArtCard";

function FineArtIndex() {
    const { landscapes, portraits, others, status, load } = useGetFineArt();
    const { user } = useAuthContext();
    return (
        <div id="Index">
            <div className="section">
                <h1>Fine Art</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            <h3>Landscapes</h3>
            <InformationTemplate payloads={landscapes} Card={FineArtCard} />

            <h3>Portraits</h3>
            <InformationTemplate payloads={portraits} Card={FineArtCard} />

            <h3>Others</h3>
            <InformationTemplate payloads={others} Card={FineArtCard} />

            {user &&
                <Card className="createCard">
                    <FineArtAdd />
                </Card>
            }
        </div>
    )
}

export default FineArtIndex;