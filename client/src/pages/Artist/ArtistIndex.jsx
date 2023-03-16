import useGet from "../../hooks/useGet";
import InformationTemplate from "../../components/Forms/InformationTemplate";
import ArtistCard from "../../components/Cards/ArtistCard";

function ArtistIndex() {
    const {payloads, status, load} = useGet("user");

    return (
        <div id="Index">
            <div className="section">
                <h1>Artists</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>

            <InformationTemplate payloads={payloads} Card={ArtistCard}/>
        </div>
    )
}

export default ArtistIndex