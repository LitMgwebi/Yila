import { Card, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";

function ArtistCard({ payload }) {
    return (
        <Card className="card">
            <Link
                to={`/artist/${payload._id}`}
                state={{ stateId: payload._id }}
            >
                <div className="cardHeader">
                    <h4>{payload.firstName}</h4>
                </div>
                <CardMedia
                    component="img"
                    alt={payload.firstName}
                    image={payload.profilePhoto}
                    className="cardMedia"
                />
            </Link>
        </Card>
    );
}

export default ArtistCard;