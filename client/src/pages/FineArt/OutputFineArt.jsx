import FineArtCard from "../../components/Cards/FineArtCard";

function OutputFineArt({ payloads }) {
    const { landscape, portrait, other } = payloads
    console.log(landscape)
    return (
        <div className="outputPayload">
            <h4 id="ProjectHeader">Landscape</h4>
            <div className="information">
                {Object.keys(landscape).length > 0 ? landscape.map((landscape) => {
                    return (
                        <FineArtCard payload={landscape} />
                    );
                }) : <h4>Whole lotta nothing</h4>}
            </div>

            <h4 id="ProjectHeader">Portrait</h4>
            <div className="information">
                {Object.keys(portrait).length > 0 ? portrait.map((portrait) => {
                    return (
                        <FineArtCard payload={portrait} />
                    )
                }) : <h4>Whole lotta nothing</h4>}
            </div>



            <h4 className="ProjectHeader">Other</h4>
            <div className="information">
                {Object.keys(other).length > 0 ? other.map((other) => {
                    return (
                        <FineArtCard payload={other} />
                    )
                }) : <h4>Whole lotta nothing</h4>}
            </div>
        </div>
    );
}

export default OutputFineArt