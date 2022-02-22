import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import PropsType from "prop-types";
import styled from "styled-components";

export default function ControlledAccordions(props) {
  const { name, desc, index } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let descCut = desc.slice(0, 50) + (desc.length > 50 ? "..." : "");

  return (
    <div style={{marginBottom : '5px'}} >
      <Accordion
        expanded={expanded === "panel" + index}
        onChange={handleChange("panel" + index)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={"panelbh-header" + index}
        >
          <Typography
            variant="subtitle2"
            component={"div"}
            sx={{ width: "35%", textAlign: "left", flexShrink: 0 }}
          >
            {name}
          </Typography>
          <Typo
            variant="caption"
            dangerouslySetInnerHTML={{ __html: descCut}}
            sx={{ color: "text.secondary"}}
          />
        </AccordionSummary>
        <AccordionDetails>{props.children}</AccordionDetails>
      </Accordion>
    </div>
  );
}

const Typo = styled(Typography)`
  p {
    font-size : 12px;
  }
`;

ControlledAccordions.propTypes = {
  name: PropsType.string,
  desc: PropsType.string,
};
