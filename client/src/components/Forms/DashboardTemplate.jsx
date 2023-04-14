import AnimationCard from "../Cards/AnimationCard";
import BackgroundCard from "../Cards/BackgroundCard";
import FineArtCard from "../Cards/FineArtCard"
import ConceptCard from "../Cards/ConceptCard";
import CharacterDesignCard from "../Cards/CharacterDesignCard";
import { useGetUnsecure, useGetFineArtUnsecure } from "../../hooks/useGet";
import AccordionDashboardTemplate from "./AccordionDashboardTemplate";

function DashboardTemplate({ id }) {
    const { payloads: animations, load: animationLoad } = useGetUnsecure('animation', id);
    const { payloads: backgrounds, load: backgroundLoad } = useGetUnsecure('background', id);
    const { landscapes, others, portraits, load: fineArtLoad } = useGetFineArtUnsecure(id);
    const { payloads: concepts, load: conceptLoad } = useGetUnsecure('concept', id);
    const { payloads: cds, load: cdload } = useGetUnsecure('characterDesign', id);

    return (
        <div className="dashboardTemplate">
            {
                animations != null ?
                    animations.length > 0 ? 
                        <AccordionDashboardTemplate
                            payloads={animations}
                            panel="panel1"
                            title="Animation"
                            Card={AnimationCard}
                            load={animationLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                backgrounds != null ?
                    backgrounds.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={backgrounds}
                            panel="panel2"
                            title="Background"
                            Card={BackgroundCard}
                            load={backgroundLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                concepts != null ?
                    concepts.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={concepts}
                            panel="panel3"
                            title="Concept"
                            Card={ConceptCard}
                            load={conceptLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                cds != null ?
                    cds.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={cds}
                            panel="panel4"
                            title="Character Design"
                            Card={CharacterDesignCard}
                            load={cdload}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                landscapes != null ?
                    landscapes.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={landscapes}
                            panel="panel5"
                            title="Landscape"
                            Card={FineArtCard}
                            load={fineArtLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                portraits != null ?
                    portraits.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={portraits}
                            panel="panel6"
                            title="Portrait"
                            Card={FineArtCard}
                            load={fineArtLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
            {
                others != null ?
                    others.length > 0 ?
                        <AccordionDashboardTemplate
                            payloads={others}
                            panel="panel7"
                            title="Others"
                            Card={FineArtCard}
                            load={fineArtLoad}
                        />
                        : <div></div>
                    : <div></div>
            }
        </div>

    );
}

export default DashboardTemplate;