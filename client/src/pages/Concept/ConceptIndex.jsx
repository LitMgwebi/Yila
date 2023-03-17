import ConceptCard from "../../components/Cards/ConceptCard";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import InformationTemplate from "../../components/Forms/InformationTemplate";
import { useAuthContext } from "../../hooks/useAuthContext";

function ConceptIndex() {
    const { payloads, status, load } = useGet("concept");
    const { user } = useAuthContext();
    return (
        <div id="Index">
            <div className="section">
                <h1>Concept Art</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                {user &&
                    <div className="button-group">
                        <button className="btn btn-light"><Link to="/concept/add">+</Link></button>
                    </div>
                }
            </div>

            <InformationTemplate payloads={payloads} Card={ConceptCard} />
        </div>
    );
}

export default ConceptIndex;