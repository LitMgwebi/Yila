import axios from "axios";
import { useState } from "react";
import baseUrl from "../../hooks/baseUrl";

function FineArtCardFlipped({ payload, flipCard }) {
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(null);

    const handleConfirm = () => {
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }

    function handleDelete() {
        axios({
            method: "DELETE",
            url: `${baseUrl}/fineArt/${payload._id}`,
            // headers: {
            //     'Authorization': `Bearer ${user.token}`
            // }
        }).then((res) => {
            setLoad(false);
            setStatus(null);
        }).catch((error) => {
            console.error(error.message);
            setLoad(false);
            setStatus(error.response.data.error);
        });
        window.location.reload(false)
    }

    return (
        <div className="fineArtFlipped">
            <div className='fineArtHeader'>
                <h4>{payload.title}</h4>
            </div>
            <div className="fineArtInformation">

                <p>{payload.description}</p>
                <p>{payload.dimension}</p>
            </div>

            <div className="controls">

                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
                <div className="button-group">
                    <button onClick={flipCard} className="btn btn-secondary">
                        Flip
                    </button>
                    <button onClick={handleConfirm} className="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FineArtCardFlipped