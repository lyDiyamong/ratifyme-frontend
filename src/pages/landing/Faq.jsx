// React Library import
import * as React from "react";

// MUI import
import { Stack, Box,Typography,  Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Custom import
import LandingContainer from "../../components/styles/LandingContainer";
import { accordionData } from "../../data/faqData";
import theme from "../../assets/themes/index";

// <!-- ============ Start Faq component ============ -->
const Faq = () => {
    // State to track which accordion is expanded
    const [expanded, setExpanded] = React.useState(false);
    // Handle the change of which accordion is expanded
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : true);
    };
    return (
        <LandingContainer>
            {/* Heading Section */}
            <Box
                sx={{
                    my: 4,
                }}
            >
                <Typography
                    component="h1"
                    sx={{
                        fontSize: theme.typography.h1,
                        fontWeight: theme.fontWeight.bold,
                        textAlign: "center",
                    }}t
                >
                    Frequently Asked Questions
                </Typography>
            </Box>
            {/* FAQ component */}
            {/* Componet allignment with Gride */}
            {/* <Stack sx={{boxShadow: theme.shadows.default}}> */}
            <Stack
                sx={{
                    px: 1,
                }}
            >
                {accordionData.map((item) => (
                    // Create a 2-column layout using Grid. Accordions alternate sides. And loop data Accordions Obj.
                    <Box key={item.panel}>
                        {/* Accordion Stage Logic */}
                        <Accordion
                            expanded={expanded === item.panel}
                            onChange={handleChange(item.panel)}
                            sx={{
                                padding: 2,
                                borderBottom: `1px solid ${theme.palette.customColors.gray200}`,
                                backgroundColor: "inherit",
                                boxShadow: "none",
                            }}
                        >
                            {/* Icon stage */}
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${item.panel}bh-content`}
                                id={`${item.panel}bh-header`}
                            >
                                {/* Accordion Tittle */}
                                <Typography
                                    component="h3"
                                    sx={{
                                        fontSize: theme.typography.h4,
                                        fontWeight: theme.fontWeight.bold,
                                        width: "80%",
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.title}
                                </Typography>
                                {/* Accordion subtittle *NOTE - if have*/}
                                <Typography sx={{ fontSize: theme.typography.sx }}>{item.subtitle}</Typography>
                            </AccordionSummary>
                            {/* Accordion Content Description */}
                            <AccordionDetails>
                                <Typography>{item.content}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))}
            </Stack>
        </LandingContainer>
    );
};
// <!-- ============ End Faq component ============ -->
export default Faq;
