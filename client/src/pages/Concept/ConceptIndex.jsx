import ConceptCard from "../../components/Cards/ConceptCard";
import { Link } from "react-router-dom";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import useGet from "../../hooks/useGet";

function ConceptIndex() {
    const {payloads, status, load} = useGet("concept")
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