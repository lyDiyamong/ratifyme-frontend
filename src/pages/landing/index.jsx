// MUI import
import { Stack } from "@mui/material";

// Custom import
import WhatWeDo from "./WhatWeDo";
import OurCustomers from "./OurCustomer.jsx";
import HeroSection from "./HeroSection.jsx";
import HowItWorks from "./HowItWorks.jsx";
import SecondHeadTitle from "./SecondHeadTitle.jsx";
import DigitalBadgeFlowStepper from "./DigitalBadgeFlowStepper.jsx";
import Faq from "./Faq";

const HomePage = () => {
    return (
        <Stack gap={{md: 15, xss: 6}}>
            <HeroSection />
            <DigitalBadgeFlowStepper/>
            <OurCustomers />
            <SecondHeadTitle />
            <HowItWorks />
            <WhatWeDo />
            <Faq />
        </Stack>
    );
};

export default HomePage;
