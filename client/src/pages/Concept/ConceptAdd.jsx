import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectHeader from "../../components/pageStructure/ProjectHeader";
import baseUrl from "../../hooks/baseUrl";

function ConceptAdd() {
    const [pieces, setPieces] = useState("");
    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(false);
    // const { user } = useAuthContext();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoad(true)
        setStatus(null)
        const formData = new FormData();

        formData.append("title", title);
        formData.append("article", article);
        for (let i = 0; i < pieces.length; i++) {
            formData.append("pieces", pieces[i]);
        }

        axios({
            method: "POST",
            url: `${baseUrl}/concept/add`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data`,
                // 'Authorization': `Bearer ${user.token}`,
            }
        }).then((res) => {
            setStatus(res.data.message)
            setLoad(false)
            navigate("/concept")
        }).catch((error) => {
            console.error(error.message);
            setStatus(error.response.data.error);
            setLoad(false);
        });
    }

    return (
        <div id="Add">
            <ProjectHeader header="Add Concept" link="/concept" />
            <form onSubmit={handleSubmit} encType='multipart/form-data'>

                <div className="formInput">
                    <div className="singleLineInput">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
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
                        <label>Pieces:</label>
                        <input
                            type="file"
                            name="pieces"
                            accept="image/*"
                            onChange={(e) => { setPieces(e.target.files) }}
                            multiple
                            required
                        />
                    </div>
                </div>
                <div className="controls">
                    {status && <div className="status">{status}</div>}
                    {load && <div>Loading...</div>}
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/portfolio/concept"><button className="btn btn-secondary">Cancel</button></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConceptAdd;