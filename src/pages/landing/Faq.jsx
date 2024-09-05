import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';

// Accordoin Data Obj
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
  // Add more accordions as needed
];

const Faq = () => {
  // State to track which accordion is expanded
  const [expanded, setExpanded] = React.useState(false);

  // Handle the change of which accordion is expanded
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };

  return (
    <section>

        <Container sx={{maxWidth:'1200px', mx:'auto'}}>
            {/* Heading Section */}
            <div>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <h1>FAQ</h1>
                </Box>
            </div>
            {/* FAQ component */}
            <div>
                {/* Componet allignment with Gride */}
                <Grid container spacing={2}>
                    {accordionData.map((item) => (
                        // Create a 2-column layout using Grid. Accordions alternate sides. And loop data Accordions Obj.
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            key={item.panel}>
                            {/* Accordion Stage Logic */}
                            <Accordion
                                expanded={expanded === item.panel}
                                onChange={handleChange(item.panel)}
                                sx={{
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Adjust shadow properties as needed
                                    }}
                            >
                                {/* Icon stage */}
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${item.panel}bh-content`}
                                id={`${item.panel}bh-header`}
                                >
                                    {/* Accordion Tittle */}
                                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                                        <h3>{item.title}</h3>
                                    </Typography>
                                    {/* Accordion subtittle *NOTE - if have*/}
                                    <Typography sx={{ color: 'text.secondary' }}>
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
                        </Grid>
                    ))}
                </Grid>
            </div>

        </Container>
    </section>

    );
}

export default Faq