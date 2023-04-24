import { Link } from "react-router-dom";
import concept from "../../media/icons/concept.svg";
import artists from "../../media/icons/artists.svg";
import fineArt from "../../media/icons/fine-art.svg";
import cd from "../../media/icons/character-design.svg";
import animation from "../../media/icons/animation.svg";
import background from "../../media/icons/background.svg";

function HomeNav() {
    return (
        <nav className="navBar">
            <div className="homeLogo">
                <Link to="/artist">
                    <img className="navLogo" src={artists} alt="artist" />
                    Artists
                </Link>
            </div>
            <div className="homeLogo">
                <Link to="/fine-art">
                    <img className="navLogo" src={fineArt} alt="fine-art" />
                    Fine Art
                </Link>
            </div>
            <div className="homeLogo">
                <Link to="/character-design">
                    <img className="navLogo" src={cd} alt="character-design" />
                    Character Design
                </Link>
            </div>

            <div className="homeLogo">
                <Link to="/animation">
                    <img className="navLogo" src={animation} alt="animation" />
                    Animation
                </Link>
            </div>
            <div className="homeLogo">
                <Link to="/concept">
                    <img className="navLogo" src={concept} alt="concept" />
                    Concept
                </Link>
            </div>
            <div className="homeLogo">
                <Link to="/background">
                    <img className="navLogo" src={background} alt="background" />
                    Background
                </Link>
            </div>
        </nav>
    );
}

export default HomeNav;