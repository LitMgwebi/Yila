import axios from "axios";
import { useState } from "react";
import baseUrl from "../../hooks/baseUrl";

function BackgroundAdd() {
    const [title, setTitle] = useState("");
    const [piece, setPiece] = useState("");
    const [status, setStatus] = useState(null)

    function handleCancel(e) {
        e.preventDefault();

        setTitle("");
        setPiece("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            title: title,
            piece: piece,
        }

        try {
            const res = await axios({
                method: 'POST',
                url: `${baseUrl}/background/add`,
                data: data,
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${user.token}`,
                }
            });

            setStatus(res.data.message)
        } catch (error) {
            setStatus(error.response.data.error);
            console.error(error.message);
        }
        window.location.reload(false)
    }
    return (
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <h3>Add</h3>
            <div className="cardForm">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Piece:</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="piece"
                        onChange={(e) => setPiece(e.target.files[0])}
                        required
                    />
                </div>
            </div>
            <div className="controls">
                {status && <div className="status">{status}</div>}
                <div className="button-group">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default BackgroundAdd;