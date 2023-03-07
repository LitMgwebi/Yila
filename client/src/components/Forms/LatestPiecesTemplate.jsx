function LatestPiecesTemplate({ payloads, Card, categoryName, load }) {
    return (
        <div>
            <span>Latest {categoryName} Pieces</span>
            <div className="latestPieces">
                
                {load ? <div className="latestPieces">Loading...</div> 
                : payloads ? payloads.map((payload, i) => {
                    return (
                        <Card payload={payload} />
                        );
                    })
                : <div className="latestPieces">Whole lot of nothing</div>}
            </div>
        </div>
    )
}

export default LatestPiecesTemplate