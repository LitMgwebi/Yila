import axios from "axios";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import TranslationAdd from "./Translation/TranslationAdd";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import baseUrl from "../../hooks/baseUrl";

function CharacterDesignAdd() {
    const [load, setLoad] = useState(false)
    const [status, setStatus] = useState(null);
    const [nameOfCharacter, setNameOfCharacter] = useState("");
    const [originalCharacter, setOriginalCharacter] = useState("");
    const [showButton, setShowButton] = useState(false);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoad(true)
        setStatus(null)

        const formData = new FormData();

        formData.append("nameOfCharacter", nameOfCharacter);
        formData.append("originalCharacter", originalCharacter);

        axios({
            method: "POST",
            url: `${baseUrl}/characterDesign/add`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data`,
                // 'Authorization': `Bearer ${user.token}`,
            }
        }).then((res) => {
            setStatus(res.data.message)

            setId(res.data.characterDesign._id)
            setShowButton(true)
            setLoad(false)
        }).catch((error) => {
            console.error(error.response.data.error);
            setStatus(error.response.data.error);
            setLoad(false)
        });
        // navigate("/character-design");
    }
    return (
        <div id="Add">

            <ProjectHeader header="Add Character Design" link="/character-design" />
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

                <div className="formInput">
                    <div className="singleLineInput">
                        <label>Name Of Character:</label>
                        <input
                            type="text"
                            name="nameOfCharacter"
                            value={nameOfCharacter}
                            onChange={(e) => setNameOfCharacter(e.target.value)}
                            required
                        />
                    </div>

                    <div className="singleLineInput">
                        <label>Original Character:</label>
                        <input
                            type="file"
                            accept="image/*"
                            name="originalCharacter"
                            onChange={(e) => setOriginalCharacter(e.target.files[0])}
                            required
                        />
                    </div>
                </div>
                <div className="controls">
                    {status && <div className="status">{status}</div>}
                    {load && <div>Loading...</div>}
                    {!showButton && <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/character-design"><button className="btn btn-danger">Cancel</button></Link>
                    </div>}
                </div>
            </form>

            {showButton && <TranslationAdd id={id} />}
        </div>
    )
}

export default CharacterDesignAdd