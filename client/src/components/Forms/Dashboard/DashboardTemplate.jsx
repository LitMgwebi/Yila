import InformationTemplate from "../InformationTemplate";
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import {useState} from "react";
import { useGetUnsecure } from "../../../hooks/useGet";

function DashboardTemplate() {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { payloads: animationPayloads, load: animationLoad } = useGetUnsecure("animation")
    const { payloads: backgroundPayloads, load: backgroundLoad } = useGetUnsecure("background")
    const { payloads: fineArtPayloads, load: fineArtLoad } = useGetUnsecure("fineArt")
    const { payloads: conceptPayloads, load: conceptLoad } = useGetUnsecure("concept")
    const { payloads: cdPayloads, load: cdLoad } = useGetUnsecure("characterDesign")

    return(
        <div className="dashboardTemplate">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={
                        <button className="cardButton">
                            {expanded ? "Close" : "Open"}
                        </button>
                    }
                >
                    <div className="translationHeader">
                        <h4>Animation</h4>
                    </div>

                </AccordionSummary>

                <AccordionDetails>
                    {/* <InformationTemplate payload={payload} Card={animationCard}/> */}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default DashboardTemplate;