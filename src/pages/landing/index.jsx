// React library import
import WhatWeDo from "./WhatWeDo";
import Testimonial from "./Testimonial";
import OurCustomers from "./OurCustomer.jsx";
import Faq from "./Faq";
import HeroSection from "./HeroSection.jsx";
import { Box, Stack, Typography } from "@mui/material";
import HowItWorks from "./HowItWorks.jsx";

const HomePage = () => {
    return (
        <Stack gap={12}>
            <HeroSection />
            <OurCustomers />
            <HowItWorks />
            {/* <WhatWeDo /> */}
            {/* <Testimonial /> */}
            <Faq />
        </Stack>
    );
};

export default HomePage;
