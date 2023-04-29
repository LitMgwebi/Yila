import { useGet } from "../../hooks/useGet";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
    const { payloads } = useGet("user");
    const [query, setQuery] = useState("");
    const searchedArtist = []

    if (payloads != null) {
        for (let i = 0; i < payloads.length; i++) {
            if (query === '')
                searchedArtist.push(payloads[i]);
            else if (payloads[i].firstName.toLowerCase().includes(query.toLowerCase()))
                searchedArtist.push(payloads[i]);
        } 
    }
    return (
        <div id="SearchBar">
            <input
                type="search"
                placeholder="Search Artist"
                value={query}
                onChange={(e) => {
                    e.preventDefault();
                    setQuery(e.target.value)
                }}
            />
            {
                query.length > 0 ?
                    searchedArtist.length > 0 ?
                        searchedArtist.map((artist, i) => {
                            return (
                                <div key={artist._id}>
                                    <Link
                                        to={`/artist/${artist._id}`}
                                        state={{ stateId: artist._id }}
                                    >
                                        {artist.firstName}
                                    </Link>
                                </div>
                            );
                        })
                        : <p>Artist does not exist</p>
                    : <></>
            }
        </div>
    );
}

export default SearchBar;