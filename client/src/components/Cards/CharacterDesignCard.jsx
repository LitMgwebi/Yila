import { Card, CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";

function CharacterDesignCard({ payload }) {

    return (
        <Card className="card">
            <Link
                to={`/character-design/${payload._id}`}
                state={{ stateId: payload._id }}
            >
                <div className="cardHeader">
                    <h4>{payload.nameOfCharacter}</h4>
                </div>
                <CardMedia
                    component="img"
                    alt={payload.nameOfCharacter}
                    image={payload.originalCharacter}
                    className="cardMedia"
                />
            </Link>
        </Card>
    );
}

export default CharacterDesignCard