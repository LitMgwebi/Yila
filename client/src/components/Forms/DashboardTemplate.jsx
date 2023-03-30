import AnimationCard from "../Cards/AnimationCard";
import BackgroundCard from "../Cards/BackgroundCard";
import { useGetUnsecure } from "../../hooks/useGet";
import AccordionDashboardTemplate from "./AccordionDashboardTemplate";

function DashboardTemplate({ id }) {


    const { payloads: animationPayloads, load: animationLoad } = useGetUnsecure("animation", id)
    const { payloads: backgroundPayloads, load: backgroundLoad } = useGetUnsecure("background", id)
    // const { payloads: fineArtPayloads, load: fineArtLoad } = useGetUnsecure("fineArt", id)
    const { payloads: conceptPayloads, load: conceptLoad } = useGetUnsecure("concept", id)
    const { payloads: cdPayloads, load: cdLoad } = useGetUnsecure("characterDesign", id)

    return (
        <div className="dashboardTemplate">

            <div className="section">
                {animationLoad && <div>Loading...</div>}
            </div>
            <AccordionDashboardTemplate
                payloads={animationPayloads}
                panel="panel1"
                title="Animation"
                Card={AnimationCard}
            />
            <AccordionDashboardTemplate
                payloads={backgroundPayloads}
                panel="panel2"
                title="Background"
                Card={BackgroundCard}
            />
            <AccordionDashboardTemplate
                payloads={animationPayloads}
                panel="panel1"
                title="Animation"
                Card={AnimationCard}
            />
            <AccordionDashboardTemplate
                payloads={animationPayloads}
                panel="panel1"
                title="Animation"
                Card={AnimationCard}
            />
        </div>
    )
}

export default DashboardTemplate;