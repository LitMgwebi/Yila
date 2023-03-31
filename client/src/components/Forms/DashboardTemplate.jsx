import AnimationCard from "../Cards/AnimationCard";
import BackgroundCard from "../Cards/BackgroundCard";
import ConceptCard from "../Cards/ConceptCard";
import CharacterDesignCard from "../Cards/CharacterDesignCard";
import { useGetUnsecure } from "../../hooks/useGet";
import AccordionDashboardTemplate from "./AccordionDashboardTemplate";

function DashboardTemplate({ id }) {


    const { payloads: animationPayloads, load: animationLoad } = useGetUnsecure("animation", id)
    const { payloads: backgroundPayloads, load: backgroundLoad } = useGetUnsecure("background", id)
    /*const { payloads: fineArtPayloads, load: fineArtLoad } = useGetUnsecure("fineArt", id)
    console.log(`Fine art: ${fineArtPayloads}`);*/
    const { payloads: conceptPayloads, load: conceptLoad } = useGetUnsecure("concept", id)
    const { payloads: cdPayloads, load: cdLoad } = useGetUnsecure("characterDesign", id)

    return (
        <div className="dashboardTemplate">

            <AccordionDashboardTemplate
                payloads={animationPayloads}
                panel="panel1"
                title="Animation"
                Card={AnimationCard}
                load={animationLoad}
            />
            < AccordionDashboardTemplate
                payloads={backgroundPayloads}
                panel="panel2"
                title="Background"
                Card={BackgroundCard}
                load={backgroundLoad}
            />
            < AccordionDashboardTemplate
                payloads={conceptPayloads}
                panel="panel3"
                title="Concept"
                Card={ConceptCard}
                load={conceptLoad}
            />
            <AccordionDashboardTemplate
                payloads={cdPayloads}
                panel="panel3"
                title="Character Design"
                Card={CharacterDesignCard}
                load={cdLoad}
            />
        </div>
    )
}

export default DashboardTemplate;