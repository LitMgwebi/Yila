import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../../hooks/baseUrl";
import { useAuthContext } from "../../../hooks/useAuthContext";

function TranslationAdd({ id }) {
    const [process, setProcess] = useState("");
    const [article, setArticle] = useState("");
    const [load, setLoad] = useState(false)
    const [status, setStatus] = useState(null);
    const [showButton, setShowButton] = useState(false);
    const { user } = useAuthContext();

    function handleSubmit(e) {
        e.preventDefault();
        setLoad(true);
        setStatus(null);
        const formData = new FormData();

        formData.append("article", article);
        for (let i = 0; i < process.length; i++) {
            formData.append("process", process[i]);
        }
        formData.append("characterDesign", id)

        axios({
            method: "POST",
            url: `${baseUrl}/translation/add`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data`,
                'Authorization': `Bearer ${user.token}`,
            },
        }).then((res) => {
            setStatus(res.data.message)
            setArticle("");
            setProcess(null);
            setShowButton(true)
            setLoad(false);
        }).catch((error) => {
            console.error(error.message);
            setStatus(error.response.data.error);
            setLoad(false);
        });
    }
    return (
        <div id="Add">

            <h2 id="ProjectHeader">Add Translation</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="formInput">
                    <div className="multilineInput">
                        <label>Article:</label>
                        <textarea
                            name="article"
                            value={article}
                            onChange={(e) => setArticle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="photoInput">
                        <label>Process:</label>
                        <input
                            type="file"
                            name="process"
                            accept="image/*"
                            onChange={(e) => { setProcess(e.target.files) }}
                            required
                            multiple
                        />
                    </div>
                </div>
                <div className="controls">
                    {status && <div className="status">{status}</div>}
                    {load && <div>Loading...</div>}
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Add Translation</button>
                        {showButton && <Link to="/character-design"><button className="btn btn-secondary">Finish</button></Link>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TranslationAdd;