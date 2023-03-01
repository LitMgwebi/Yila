import { Card, CardMedia } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../hooks/baseUrl";
// import { useAuthContext } from "../../../../../hooks/useAuthContext";

function BackgroundCard({ payload }) {
    const [status, setStatus] = useState(null);
    const [isPending, setIsPending] = useState(true);
    // const { user } = useAuthContext();

    const useConfirm = () => {
        setIsPending(true)
        if (window.confirm("Are you sure you want to delete"))
            handleDelete();
    }



    async function handleDelete() {
        try {
            const res = await axios({
                method: "DELETE",
                url: `${baseUrl}/background/${payload._id}`,
                // headers: {
                //     'Authorization': `Bearer ${user.token}`
                // }
            })

            setStatus(res.data.message)
        } catch (error) {
            setStatus(error.response.data.error);
            console.log(error.message)
        }
        window.location.reload(false)
    }
    return (
        <div>
            <Card className="backgroundCard" onClick={useConfirm}>
                <CardMedia
                    component="img"
                    alt={payload.title}
                    image={payload.photo}
                    className="cardMedia"
                />

                <div className="cardHeader">
                    <h4>{payload.title}</h4>
                    {status && <div className="status">{status}</div>}
                    {isPending && <div>Loading...</div>}
                </div>
            </Card>
        </div>
    )
}

export default BackgroundCard;