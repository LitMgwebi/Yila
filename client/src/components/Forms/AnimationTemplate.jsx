import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { useState } from "react";
import Slider from "../pageStructure/Slider";

function AnimationTemplate({ payload }) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className="animationTemplate">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={
                        <button className="cardButton">
                            {expanded ? "Close" : "Open"}
                        </button>
                    }
                >
                    <div className="translationHeader">
                        <h4>Movements</h4>
                    </div>

                </AccordionSummary>

                <AccordionDetails>
                    <Slider pieces={payload.movements} title={payload.title} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={
                        <button className="cardButton">
                            {expanded ? "Close" : "Open"}
                        </button>
                    }
                >
                    <div className="translationHeader">
                        <h4>Background</h4>
                    </div>

                </AccordionSummary>

                <AccordionDetails>
                    <Slider pieces={payload.backgrounds} title={payload.title} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={
                        <button className="cardButton">
                            {expanded ? "Close" : "Open"}
                        </button>
                    }
                >
                    <div className="translationHeader">
                        <h4>Effects</h4>
                    </div>

                </AccordionSummary>

                <AccordionDetails>
                    <Slider pieces={payload.effects} title={payload.title} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AnimationTemplate;