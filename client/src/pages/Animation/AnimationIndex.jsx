import AnimationCard from "../../components/Cards/AnimationCard";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import { Link } from "react-router-dom";
import useGet from "../../hooks/useGet";
import InformationTemplate from "../../components/pageStructure/InformationTemplate";

function AnimationIndex() {
    const {payloads, status, load} = useGet("animation")
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
            <InformationTemplate payloads={payloads} Card={AnimationCard}/>
        </div>
    );
}

export default AnimationIndex