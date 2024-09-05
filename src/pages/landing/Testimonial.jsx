// React library import
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// MUI import
import { FormatQuote } from "@mui/icons-material";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";

//Custom import
import theme from "../../assets/themes";
import { testimonials } from "../../data/testimonialData";
import LandingContainer from "../../components/styles/LandingContainer";

// Configuration for the carousel responsiveness
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1500 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 1500, min: 1000 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1000, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
    },
};

//============ start testimonial section ============

const Testimonial = () => {
    return (
        <LandingContainer
            style={{
                padding: "0rem",
                backgroundColor: theme.palette.background,
                textAlign: "center",
            }}
        >
            <Typography
                gutterBottom
                sx={{
                    fontSize: theme.typography.h1,
                    fontWeight: theme.fontWeight.bold,
                    textAlign: "center"
                }}
            >
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
                    <div key={index} style={{ padding: "1rem" }}>
                        <Card
                            sx={{
                                padding: "1.5rem",
                                marginBottom: "1rem",
                                textAlign: "left",
                                border: "1px solid #ddd",
                                borderRadius: "15px",
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                minHeight: "230px",
                                [theme.breakpoints.down("sm")]: {
                                    flexDirection: "column",
                                    textAlign: "center",
                                    padding: "1rem", // Add more padding for better spacing
                                },
                            }}
                        >
                            <Avatar
                                alt={testimonial.author}
                                src={testimonial.image}
                                sx={{
                                    width: "100%", // Adjusted to fit container width on mobile
                                    height: "auto", // Maintain aspect ratio
                                    maxWidth: "150px", // Maximum size for mobile
                                    marginRight: "1.5rem",
                                    borderRadius: "12px",
                                    [theme.breakpoints.down("sm")]: {
                                        width: "80%", // Smaller size on mobile to fit better
                                        height: "auto",
                                        marginBottom: "1rem",
                                        marginRight: 0,
                                    },
                                }}
                            />
                            {/* Start testimonial card */}
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography
                                            color="primary"
                                            variant="h3"
                                            component="div"
                                            sx={{
                                                fontSize: "4rem",
                                                rotate: "180deg",
                                                display: {
                                                    xss: "none",
                                                    sm: "block",
                                                },
                                            }}
                                        >
                                            <FormatQuote
                                                sx={{
                                                    fontSize: "4rem",
                                                    rotate: "180deg",
                                                }}
                                            />
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight:
                                                    theme.fontWeight.bold,
                                                color: theme.palette.text
                                                    .primary,
                                                marginBottom: "1rem",
                                                [theme.breakpoints.down("sm")]:
                                                    {
                                                        textAlign: "center",
                                                        fontSize: "0.9rem", // Reduced font size for mobile
                                                    },
                                            }}
                                        >
                                            {testimonial.text}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: theme.fontWeight.semiBold,
                                                color: theme.palette.text.disabled,
                                                fontSize: "0.85rem",
                                            }}
                                        >
                                            {testimonial.author}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: theme.fontWeight.semiBold,
                                                color: theme.palette.text.disabled,
                                                fontSize: "0.75rem",
                                            }}
                                        >
                                            {testimonial.position}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            {/* End testimonial card */}
                        </Card>
                    </div>
                ))}
            </Carousel>
        </LandingContainer>
    );
};

export default Testimonial;

//============ end testimonial section ============
