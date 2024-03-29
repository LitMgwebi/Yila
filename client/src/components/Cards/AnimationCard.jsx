import { Card, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";

function AnimationCard({ payload }) {
    return (
        <Card className="card">
            <Link
                to={`/animation/${payload._id}`}
                state={{ stateId: payload._id }}
            >
                <div className="cardHeader">
                    <h4>{payload.title}</h4>
                </div>
                <CardMedia
                    component="video"
                    alt={payload.title}
                    image={payload.preview}
                    className="cardMedia"
                    //autoPlay
                />
            </Link>
        </Card>
    );
}

export default AnimationCard;