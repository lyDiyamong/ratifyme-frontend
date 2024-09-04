import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import default styles from the package
import RatanakImg from '../../assets/icons/RatanakImg.svg';
import LyHour from '../../assets/icons/LyHour.svg';
import theme from '../../assets/themes';

const testimonials = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facilis, modi, obcaecati explicabo nihil odit laudantium Dohearas voluptatem sunt.",
        author: "Rathanak",
        position: "HR of The Lorem Company",
        image: RatanakImg,
    },
    {
        id: 2,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facilis, modi, obcaecati explicabo nihil odit laudantium Dohearas voluptatem sunt.",
        author: "Ly Hour",
        position: "HR of The Lorem Company",
        image: LyHour,
    },
    {
        id: 3,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facilis, modi, obcaecati explicabo nihil odit laudantium Dohearas voluptatem sunt.",
        author: "Rotha",
        position: "HR of The Lorem Company",
        image: "path_to_image_1.jpg",
    },
    {
        id: 4,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facilis, modi, obcaecati explicabo nihil odit laudantium Dohearas voluptatem sunt.",
        author: "Srey Pov",
        position: "HR of The Lorem Company",
        image: "path_to_image_2.jpg",
    },
];

// Configuration for the carousel responsiveness
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1500 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 1500, min: 1200 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1200, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
    },
};


const Testimonial = () => {
  return (
    <div style={{ padding: '0rem', backgroundColor: '#F9FBFF', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.text.disabled }}>
        What Our Clients Say
      </Typography>
      <Carousel 
        responsive={responsive}
        infinite={true} // Makes the carousel loop infinitely
        autoPlay={true} // Enables autoplay
        autoPlaySpeed={3000} // Auto slides every 3 seconds
        keyBoardControl={true} // Enable keyboard navigation
        swipeable={true} // Allow swiping on touch devices
        draggable={true} // Enable dragging for mouse users
        showDots={true} // Show navigation dots
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{ padding: '1rem' }}>
            <Card
              sx={{
                padding: '1rem',
                marginBottom: '1rem',
                textAlign: 'left',
                border: '1px solid #ddd',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                minHeight: '230px',
                [theme.breakpoints.down('sm')]: {
                  flexDirection: 'column',
                  textAlign: 'center',
                },
              }}
            >
              <Avatar
                alt={testimonial.author}
                src={testimonial.image}
                sx={{
                  width: 139,
                  height: 139,
                  marginRight: '1.5rem',
                  borderRadius: '12px',
                  [theme.breakpoints.down('sm')]: {
                    width: 100,
                    height: 100,
                    marginRight: 0,
                    marginBottom: '1rem',
                  },
                }}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography color="primary" variant="h3" component="div">
                      <FormatQuote sx={{ fontSize: '5rem', rotate: '180deg' }} />
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.text.primary,
                        marginBottom: '1rem',
                        [theme.breakpoints.down('sm')]: {
                          textAlign: 'center',
                        },
                      }}
                    >
                      {testimonial.text}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.disabled }}>
                      {testimonial.author}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.disabled }}>
                      {testimonial.position}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;
