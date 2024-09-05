// React Library Import
import * as React from 'react';

// MUI Import
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { Container, Stack } from '@mui/material';
import Box from '@mui/material/Box';

// Custom Import
import theme from "../../assets/themes/index"

// <!-- ============ Start accordionData ============ -->
const accordionData = [
    {   panel: 'panel1',
        title: 'How to create account',
        subtitle: '',
        content: 'Proident cillum ipsum nostrud occaecat ad enim laborum. Minim ex labore laborum id. Mollit in aute sunt cillum minim eiusmod. Cupidatat officia nisi non ullamco esse quis dolore sit in cillum eiusmod. Aliquip dolore cupidatat enim commodo incididunt tempor duis labore amet. Consequat irure duis ut do et magna veniam proident. In ullamco veniam culpa voluptate eu proident cupidatat.'
    },

    {   panel: 'panel2',
        title: 'Users',
        subtitle: '',
        content: 'Incididunt irure minim anim do fugiat voluptate nulla exercitation commodo nostrud Lorem deserunt magna officia. Aliquip mollit enim aliqua nulla magna non id proident dolore pariatur excepteur fugiat mollit. Ad cupidatat nisi nisi eiusmod eiusmod laborum reprehenderit nisi velit consequat.'
    },

    {   panel: 'panel3',
        title: 'Advanced settings',
        subtitle: '',
        content: 'Laboris elit non duis eu fugiat incididunt sint. Eu exercitation quis est voluptate mollit esse excepteur ea pariatur do nulla et reprehenderit anim. Tempor magna commodo pariatur eu nostrud culpa est in labore exercitation dolore mollit dolore. Mollit sit culpa occaecat esse aute.'
    },

    {   panel: 'panel4',
        title: 'Personal data',
        subtitle: '',
        content: 'Sint sint sunt sunt dolor tempor est pariatur dolor. Aute amet amet non magna eu fugiat ullamco anim consequat. Exercitation aliqua pariatur laborum cillum est Lorem fugiat dolore quis. Pariatur minim eu sunt aliquip. Consequat cupidatat ut tempor do deserunt.'
    },

    {   panel: 'panel5',
        title: 'Personal data',
        subtitle: '',
        content: 'Ad mollit fugiat aute commodo cupidatat sunt est qui aliqua mollit qui esse voluptate voluptate. Labore sit excepteur enim consectetur irure elit. Consequat velit nostrud nostrud ullamco incididunt do laborum labore labore incididunt enim velit.'
    },
    {   panel: 'panel6',
        title: 'Personal data',
        subtitle: '',
        content: 'Occaecat sunt consequat minim minim magna commodo dolore incididunt aliqua dolor anim sunt consequat. Laborum nostrud quis incididunt id et adipisicing anim nostrud deserunt. Eiusmod officia Lorem consequat irure adipisicing aute aliqua ad dolor laboris sit ut do. Magna aute ea Lorem reprehenderit exercitation aliquip mollit pariatur aliqua aute proident occaecat. Et fugiat voluptate esse aliqua ex cillum commodo fugiat mollit Lorem deserunt minim culpa. Lorem elit Lorem dolore quis Lorem proident proident. Pariatur incididunt cillum consequat pariatur laborum enim nisi commodo officia qui.'
    },
  // Add more accordions as needed
];
// <!-- ============ End accordionData ============ -->
// <!-- ============ Start Faq Function ============ -->
const Faq = () => {
    // State to track which accordion is expanded
    const [expanded, setExpanded] = React.useState(false);
    // Handle the change of which accordion is expanded
    const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
    };
    return (
        <Container sx={{maxWidth:'1200px', width:"100%" , mx:'auto'}}>
            {/* Heading Section */}
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                        <Typography component="h1"
                                    sx={{
                                        fontSize: theme.typography.h1,
                                        fontWeight: theme.fontWeight.bold,
                                        margin: '41px' // Add this line to create the gap
                                    }}>
                                        FAQ
                        </Typography>
                </Box>
            {/* FAQ component */}
                {/* Componet allignment with Gride */}
                {/* <Stack sx={{boxShadow: theme.shadows.default}}> */}
                <Stack >
                    {accordionData.map((item) => (
                        // Create a 2-column layout using Grid. Accordions alternate sides. And loop data Accordions Obj.
                        <Box
                            key={item.panel}>
                            {/* Accordion Stage Logic */}
                            <Accordion
                                expanded={expanded === item.panel}
                                onChange={handleChange(item.panel)}
                                sx={{
                                    padding: 2,
                                    borderBottom: `1px solid ${theme.palette.customColors.gray200}`,
                                    }}
                            >
                                {/* Icon stage */}
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${item.panel}bh-content`}
                                id={`${item.panel}bh-header`}
                                >
                                    {/* Accordion Tittle */}
                                    <Typography component="h3"
                                                sx={{   fontSize:theme.typography.h4,
                                                        fontWeight: theme.fontWeight.bold,
                                                        width: '80%', flexShrink: 0 }}
                                    >
                                        {item.title}
                                    </Typography>
                                    {/* Accordion subtittle *NOTE - if have*/}
                                    <Typography sx={{ fontSize: theme.typography.sx }}>
                                        {item.subtitle}
                                    </Typography>
                                </AccordionSummary>
                                {/* Accordion Content Description */}
                                <AccordionDetails>
                                    <Typography>
                                        {item.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Stack>
        </Container>
    );
}
// <!-- ============ End Faq Function ============ -->
export default Faq