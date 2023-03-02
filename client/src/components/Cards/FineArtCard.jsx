import ReactCardFlip from "react-card-flip";
import { Card, CardMedia } from "@material-ui/core";
import FineArtCardFlipped from "./FineArtCardFlipped";
import { useState } from "react"

function FineArtCard({ payload }) {
    const [flip, setFlip] = useState(false);

    function flipCard(e) {
        setFlip(!flip);
    }
    return (
        <ReactCardFlip isFlipped={flip} flipDirection="vertical">
            <Card onClick={flipCard} className="card">
                <div className="cardHeader">
                    <h4>{payload.title}</h4>
                </div>
                <CardMedia
                    component="img"
                    alt={payload.title}
                    image={payload.piece}
                    className="cardMedia"
                />
            </Card>
            <Card className="card">
                <FineArtCardFlipped payload={payload} flipCard={flipCard} />
            </Card>
        </ReactCardFlip>
    )
}

export default FineArtCard;