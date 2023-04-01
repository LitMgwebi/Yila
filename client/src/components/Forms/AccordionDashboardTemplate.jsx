import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { useState } from "react";

function AccordionDashboardTemplate({ payloads, panel, title, Card, load }) {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="accordionDashboard">
            <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
                <AccordionSummary
                    expandIcon={
                        <button className="cardButton">
                            {expanded ? "Close" : "Open"}
                        </button>
                    }
                >
                    <div className="translationHeader">
                        <h4>{title}</h4>
                    </div>

                </AccordionSummary>

                {load ? <div>Loading...</div>
                    : <AccordionDetails>
                        {
                            payloads.map((payload, i) => {
                                return (
                                    <Card payload={payload} key={i} />
                                );
                            })
                        }
                    </AccordionDetails>
                }
            </Accordion>
        </div>
    )
}

export default AccordionDashboardTemplate;