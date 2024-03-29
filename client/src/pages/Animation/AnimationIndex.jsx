import AnimationCard from "../../components/Cards/AnimationCard";
import { Link } from "react-router-dom";
import { useGet } from "../../hooks/useGet";
import InformationTemplate from "../../components/Forms/InformationTemplate";
import { useAuthContext } from "../../hooks/useAuthContext";

function AnimationIndex() {
    const { payloads, status, load } = useGet("animation");
    const { user } = useAuthContext();
    return (
        <div id="Index">
            <div className="section">
                <h1>Animation</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                {user &&
                    <div className="addButton">
                        <button className="btn btn-light"><Link to="/animation/add">+</Link></button>
                    </div>
                }
            </div>
            <InformationTemplate payloads={payloads} Card={AnimationCard} />
        </div>
    );
}

export default AnimationIndex