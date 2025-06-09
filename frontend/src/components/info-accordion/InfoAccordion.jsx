import {Accordion, AccordionDetails, AccordionSummary, Icon, Typography} from "@mui/material";
import {faChevronDown, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const InfoAccordion = ({text1, text2}) => (


    <Accordion elevation={0} disableGutters style={{margin:"0 5%", padding:"0 5%"}}>
        <AccordionSummary
            expandIcon={<Icon icon={faChevronDown} />}
            aria-controls="info-content"
            id="info-header"
            sx={{
                px: 0,
                '& .MuiAccordionSummary-content': { alignItems: 'center' },
            }}
        >
            <Icon icon={faInfoCircle} style={{ marginRight: 8 }} />
            <Typography variant="subtitle2">Pojašnjenje</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
            <Typography variant="body2">
                {text1}
            </Typography>
            <br/>
            <Typography variant="body2">
                {text2}
            </Typography>
        </AccordionDetails>
    </Accordion>

)

export default InfoAccordion;