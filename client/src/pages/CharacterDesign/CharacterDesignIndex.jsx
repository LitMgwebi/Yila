import CharacterDesignCard from "../../components/Cards/CharacterDesignCard";
import { Link } from "react-router-dom";
import useGet from "../../hooks/useGet";
import InformationTemplate from "../../components/Forms/InformationTemplate";

function CharacterDesignIndex() {
    const {payloads, status, load} = useGet("characterDesign")
    return (
        <div id="Index">
            <div className="section">
                <h1>Character Design</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="addButton">
                    <button className="btn btn-light"><Link to="/character-design/add">+</Link></button>
                </div>
            </div>
            <InformationTemplate payloads={payloads} Card={CharacterDesignCard}/>
        </div>
    )

}

export default CharacterDesignIndex;