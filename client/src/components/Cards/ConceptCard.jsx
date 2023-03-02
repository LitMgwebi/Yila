import { Card, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";

function ConceptCard({ payload }) {
    return (
        <Card className="card">
            <Link
                to={`/concept/${payload._id}`}
                state={{ stateId: payload._id }}
            >
                <div className="cardHeader">
                    <h4>{payload.title}</h4>
                </div>
                <CardMedia
                    component="img"
                    alt={payload.title}
                    image={payload.pieces[0]}
                    className="cardMedia"
                />
            </Link>
        </Card>
    );
}

export default ConceptCard;