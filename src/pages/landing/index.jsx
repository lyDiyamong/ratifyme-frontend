// React library import
import React from "react";
import WhatWeDo from "./WhatWeDo";
import Testimonial from "./Testimonial";
import OurCustomer from "./OurCustomer.jsx";
import Faq from "./Faq";
import HeroSection from "./HeroSection.jsx";
import { Stack } from "@mui/material";

const HomePage = () => {
    return (
        <Stack gap={8}>
            <HeroSection />
            <OurCustomer />
            <WhatWeDo />
            <Testimonial />
            <Faq />
        </Stack>
    );
};

export default HomePage;
