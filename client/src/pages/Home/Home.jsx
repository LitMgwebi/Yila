import { Link } from "react-router-dom";

function Home() {
    return (
        <div id="Home">
            <nav>
                <button>
                    <Link to="/artists">Artists</Link>
                </button>
                <button>
                    <Link to="/fine-art">Fine Art</Link>
                </button>
                <button>
                    <Link to="/character-design">Character Design</Link>
                </button>
                <button>
                    <Link to="/animation">Animation</Link>
                </button>
                <button>
                    <Link to="/concept">Concept</Link>
                </button>
                <button>
                    <Link to="/background">Background</Link>
                </button>

            </nav>
        </div>
    )
}

export default Home;