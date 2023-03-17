import axios from 'axios';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectHeader from '../../components/pageStructure/ProjectHeader';
import baseUrl from '../../hooks/baseUrl';
import {useAuthContext} from "../../hooks/useAuthContext";

function AnimationAdd() {
    const [title, setTitle] = useState("");
    const [article, setArticle] = useState("");
    const [movements, setMovements] = useState("");
    const [preview, setPreview] = useState("");
    const [effects, setEffects] = useState("");
    const [backgrounds, setBackgrounds] = useState("");
    const [load, setLoad] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuthContext();

    function handleSubmit(e) {
        e.preventDefault();
        setLoad(true)
        setStatus(null)

        const formData = new FormData();

        formData.append("title", title);
        formData.append("article", article);
        formData.append("preview", preview);
        for (let i = 0; i < movements.length; i++) {
            formData.append("movements", movements[i]);
        }
        for (let i = 0; i < effects.length; i++) {
            formData.append("effects", effects[i]);
        }
        for (let i = 0; i < backgrounds.length; i++) {
            formData.append("backgrounds", backgrounds[i]);
        }

        axios({
            method: "POST",
            url: `${baseUrl}/animation/add`,
            data: formData,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`,
            }
        }).then((res) => {
            setStatus(res.data.message)
            setLoad(false)
            navigate("/animation");
        }).catch((error) => {
            setStatus(error.response.data.error);
            setLoad(false)
            console.error(error.message);
        })
    }
    return (
        <div id="Add">
            <ProjectHeader header="Add Animation" link="/animation" />
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="formInput">
                    <div className="singleLineInput">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="photoInput">
                        <label>Preview:</label>
                        <input
                            type="file"
                            accept="video/*"
                            name="preview"
                            required
                            onChange={(e) => setPreview(e.target.files[0])}
                        />
                    </div>
                    <div className="multilineInput">
                        <label>Article:</label>
                        <textarea
                            name="article"
                            value={article}
                            required
                            onChange={(e) => setArticle(e.target.value)}
                        />
                    </div>
                    <div className="photoInput">
                        <label>Movements:</label>
                        <input
                            type="file"
                            required
                            name="movements"
                            accept="image/*"
                            onChange={(e) => { setMovements(e.target.files) }}
                            multiple
                        />
                    </div>
                    <div className="photoInput">
                        <label>Backgrounds:</label>
                        <input
                            type="file"
                            name="backgrounds"
                            required
                            accept="image/*"
                            onChange={(e) => { setBackgrounds(e.target.files) }}
                            multiple
                        />
                    </div>
                    <div className="photoInput">
                        <label>Effects:</label>
                        <input
                            type="file"
                            name="effects"
                            required
                            accept="image/*"
                            onChange={(e) => { setEffects(e.target.files) }}
                            multiple
                        />
                    </div>
                </div>
                <div className="controls">
                    {load && <div>Loading...</div>}
                    {status && <div className="status">{status}</div>}
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link to="/animation"><button className='btn btn-secondary'>Cancel</button></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AnimationAdd;