import axios from "axios";
import { useState } from "react";
import baseUrl from "../../hooks/baseUrl";

function FineArtAdd() {
    const [status, setStatus] = useState(null);

    const [title, setTitle] = useState("");
    const [physicalType, setPhysicalType] = useState("");
    const [dimension, setDimension] = useState("");
    const [article, setArticle] = useState("");
    const [piece, setPiece] = useState("");
    const [load, setLoad] = useState(false);

    function handleCancel(e){
        e.preventDefault();

        setTitle("");
        setPhysicalType("");
        setDimension("");
        setArticle("");
        setPiece("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoad(true)
        const data = {
            title: title,
            physicalType: physicalType,
            dimension: dimension,
            piece: piece,
            article: article,
        }

        try{
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/fineArt/add`,
                data: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${user.token}`,
                }
            });
            setStatus(res.data.message);
            setLoad(false)
        }catch(error){
            setStatus(error.response.data.error);
            console.error(error.message);
            setLoad(false)
        }

        window.location.reload(false)
    }
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>

            <h3>Add Fine art</h3>

            <div className="cardForm">

                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <label>Type:</label>
                    <select
                        name="physicalType"
                        value={physicalType}
                        onChange={(e) => { setPhysicalType(e.target.value) }}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Landscape">Landscape</option>
                        <option value="Portrait">Portrait</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Dimension:</label>
                    <input
                        type="text"
                        name="dimension"
                        required
                        value={dimension}
                        onChange={(e) => setDimension(e.target.value)}
                    />
                </div>

                <div>
                    <label>Article:</label>
                    <textarea
                        name="article"
                        required
                        value={article}
                        onChange={(e) => setArticle(e.target.value)}
                    />
                </div>

                <div>
                    <label>Piece:</label>
                    <input
                        type="file"
                        required
                        accept="image/*"
                        name="piece"
                        onChange={(e) => setPiece(e.target.files[0])}
                    />
                </div>
            </div>
            <div className="controls">
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default FineArtAdd;