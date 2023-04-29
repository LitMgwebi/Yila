import HomeNav from "../../components/pageStructure/HomeNav";
import CharacterDesignCard from "../../components/Cards/CharacterDesignCard";
import AnimationCard from "../../components/Cards/AnimationCard";
import BackgroundCard from "../../components/Cards/BackgroundCard";
import FineArtCard from "../../components/Cards/FineArtCard";
import { useGet, useGetFineArt } from "../../hooks/useGet";
import ConceptCard from "../../components/Cards/ConceptCard";
import LatestPiecesTemplate from "../../components/Forms/LatestPiecesTemplate";
import SearchBar from "../../components/pageStructure/SearchBar";

function Home() {
    const { payloads: animationPayloads, load: animationLoad } = useGet("animation")
    const { payloads: backgroundPayloads, load: backgroundLoad } = useGet("background")
    const { landscapes, others, portraits, load: fineArtLoad } = useGetFineArt();
    const { payloads: conceptPayloads, load: conceptLoad } = useGet("concept")
    const { payloads: cdPayloads, load: cdLoad } = useGet("characterDesign")
    return (
        <div id="Home">
            <SearchBar/>
            <HomeNav />

            <div></div>
            <div className="homePiecesDisplay">
                <LatestPiecesTemplate
                    payloads={conceptPayloads}
                    Card={ConceptCard}
                    categoryName="Concept"
                    load={conceptLoad}
                    link="/concept"
                />
                <LatestPiecesTemplate
                    payloads={cdPayloads}
                    Card={CharacterDesignCard}
                    categoryName="Character Design"
                    load={cdLoad}
                    link="/character-design"
                />
                <LatestPiecesTemplate
                    payloads={animationPayloads}
                    Card={AnimationCard}
                    categoryName="Animation"
                    load={animationLoad}
                    link="/animation"
                />
                <LatestPiecesTemplate
                    payloads={backgroundPayloads}
                    Card={BackgroundCard}
                    categoryName="Background"
                    load={backgroundLoad}
                    link="/background"
                />
                <LatestPiecesTemplate
                    payloads={landscapes}
                    Card={FineArtCard}
                    categoryName="Landscape"
                    load={fineArtLoad}
                    link="fine-art"
                />

                <LatestPiecesTemplate
                    payloads={portraits}
                    Card={FineArtCard}
                    categoryName="Portrait"
                    load={fineArtLoad}
                    link="fine-art"
                />
                
                <LatestPiecesTemplate
                    payloads={others}
                    Card={FineArtCard}
                    categoryName="Other"
                    load={fineArtLoad}
                    link="fine-art"
                />
            </div>
        </div>
    )
}

export default Home;