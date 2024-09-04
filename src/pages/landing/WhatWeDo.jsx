// import react property 
import React from 'react';

// import MUI element
import { Container, Typography, Grid,Box} from '@mui/material';

// import asset file
import WhatWeDoImg1 from "../../assets/icons/WhatWeDoImg1.svg";
import WhatWeDoImg2 from "../../assets/icons/WhatWeDoImg2.svg";
import theme from '../../assets/themes/index';


// start What We Do section 
export default function WhatWeDo () {
  return (
    <Container sx={{ my: 5 , backgroundColor: theme.palette.background, maxWidth:'1200px'}}>
      {/* Title */}
      <Typography variant="h4" align="center" gutterBottom sx={{fontWeight: 600, color: theme.palette.text.disabled}} >
        What We Do
      </Typography>

      {/* start first image and paragraph */}
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
         

        <Box component="img" src={WhatWeDoImg1} alt="What We Do" sx={{ width: '100%', borderRadius: '8px' } }  />
        </Grid>
        <Grid container item xs={12} md={6} gap={2.5}>
          <Typography variant="body1">
          Similique facilis, modi, obcaecati explicabo nihil odit laudantium ipsa quia, quo possimus dicta. Consequatur aliquid quidem voluptatem sunt ipsum deserunt obcaecati!
          </Typography>
          <Typography variant="body1">
          Similique facilis, modi, obcaecati explicabo nihil odit laudantium ipsa quia, quo possimus dicta. Consequatur aliquid quidem voluptatem sunt ipsum deserunt obcaecati!
          </Typography>
          <Typography variant="body1">
          Similique facilis, modi, obcaecati explicabo nihil odit laudantium ipsa quia, quo possimus dicta. Consequatur aliquid quidem voluptatem sunt ipsum deserunt obcaecati!
          </Typography>
        </Grid>
      </Grid>

      {/* end first image and paragraph */}

      {/* start second image and paragraph */}
      <Grid container spacing={4} alignItems="center" sx={{ mt: 4 }} >
        <Grid container item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }} gap={2.5}>

        <Typography component="h4" sx={{fontSize:theme.typography.h2 , fontWeight: 600, color: theme.palette.text.primary}} >What Our Service Provide ?</Typography>

          <Typography variant="body1" >
          Provide the digital credential standard that allows individuals to earn, display, and share verified badges representing their skills and achievements. Each badge contains detailed metadata, such as the issuing organization, criteria for earning the badge, and evidence of the achievement.
          </Typography>
          <Typography variant="body1">
          making it a trustworthy and portable way to showcase skills across different platforms and communities.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
        <Box component="img" src={WhatWeDoImg2} alt="What We Do" sx={{ width: '100%', borderRadius: '8px', border:"1px solid #E0E0E0" }} />

        </Grid>
      </Grid>

       {/* end second image and paragraph  */}

    </Container>
  );
};

// end What We Do section 




