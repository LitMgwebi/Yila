import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../hooks/baseUrl";
import { useAuthContext } from "../../../hooks/useAuthContext";
import CardSlider from "../../../components/pageStructure/CardSlider";

function TranslationIndex({ payload }) {
    const process = Array.from(payload.process);
    const [status, setStatus] = useState(null);
    const [load, setLoad] = useState(false);
    const { user } = useAuthContext();

    const handleConfirm = () => {
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }

    console.log(payload)

    function handleDelete() {
        setLoad(true)
        axios({
            method: "DELETE",
            url: `${baseUrl}/translation/${payload._id}`,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then((res) => {
            setStatus(res.data.message);
            setLoad(false);
        }).catch((error) => {
            setStatus(error.response.data.error);
            console.error(error.message);
            setLoad(false);
        });
    }
    return (
        <div className="translationIndex">
            <div className="controls">
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}

                {user &&
                    <div className="button-group">
                        <button onClick={handleConfirm} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                }
            </div>

            <div className="translationInformation">
                <div className="translationDescription">
                    <p>{payload.article}</p>
                </div>
                <div className="translationSlider">
                    <CardSlider pieces={process} title="process Image" />
                </div>
            </div>
        </div>
    )
}

export default TranslationIndex;