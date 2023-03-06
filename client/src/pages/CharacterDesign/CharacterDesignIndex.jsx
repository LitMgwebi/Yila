import CharacterDesignCard from "../../components/Cards/CharacterDesignCard";
import { Link } from "react-router-dom";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import useGet from "../../hooks/useGet";

function CharacterDesignIndex() {
    const {payloads, status, load} = useGet("characterDesign")
    return (
        <div id="Index">
            <div className="section">
                <ProjectHeader header="Character Design" link="/" />
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="addButton">
                    <button className="btn btn-light"><Link to="/character-design/add">+</Link></button>
                </div>
            </div>
            <div className="information">
                {payloads === null ? <div className="information">Whole lot of nothing</div>
                    : payloads.map((payload, i) => {
                        return (
                            <CharacterDesignCard payload={payload} />
                        );
                    })}
            </div>
        </div>
    )

}

export default CharacterDesignIndex;