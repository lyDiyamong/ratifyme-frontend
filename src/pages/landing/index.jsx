// Custom import
import WhatWeDo from "./WhatWeDo";
import OurCustomers from "./OurCustomer.jsx";
import Faq from "./Faq";
import HeroSection from "./HeroSection.jsx";
import { Stack } from "@mui/material";
import HowItWorks from "./HowItWorks.jsx";
import SecondHeadTitle from "./SecondHeadTitle.jsx";

const HomePage = () => {
    return (
        <Stack gap={{md: 15, xss: 6}}>
            <HeroSection />
            <OurCustomers />
            <SecondHeadTitle />
            <HowItWorks />
            <WhatWeDo />
            <Faq />
        </Stack>
    );
};

export default HomePage;
