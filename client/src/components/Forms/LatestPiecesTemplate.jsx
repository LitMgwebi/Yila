import { Link } from "react-router-dom";

function LatestPiecesTemplate({ payloads, Card, categoryName, load, link }) {
    return (
        <div className="latest">
            <div className="latestPiecesHeader">
                <h4>Latest {categoryName} Pieces</h4>
            </div>
            <div className="latestPieces">
                {payloads ? payloads.map((payload, i) => {
                        return (
                            <Card payload={payload} key={i} />
                        );
                    })
                        : <div>Whole lot of nothing</div>
                }

                <Link to={link} className="seeMore">See More...</Link>
            </div>
        </div>
    )
}

export default LatestPiecesTemplate